-- ------------------------------------------------------------------------------------------------
-- 1. Update Schema for better functionality and security
-- ------------------------------------------------------------------------------------------------

-- Add payment_status to orders table
ALTER TABLE orders ADD COLUMN payment_status TEXT DEFAULT 'pending';
-- Add order_items table to store details of items in an order
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id UUID REFERENCES menu_items(id),
    quantity INT NOT NULL,
    price_at_time NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add user_id to employees table for RLS
ALTER TABLE employees ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- ------------------------------------------------------------------------------------------------
-- 2. Realtime Enable
-- ------------------------------------------------------------------------------------------------

-- Enable Realtime for tables that need immediate updates in the POS system
ALTER PUBLICATION supabase_realtime ADD TABLE orders, inventory;

-- ------------------------------------------------------------------------------------------------
-- 3. Row Level Security (RLS) Policies
-- ------------------------------------------------------------------------------------------------

-- Enable RLS on all application tables
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Policy for Inventory: Only authenticated users (staff) can view and manage
CREATE POLICY "Staff can view inventory" ON inventory
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Staff can manage inventory" ON inventory
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Policy for Employees: Staff can view all, but only the employee themselves can update their own record (e.g., contact info)
CREATE POLICY "Staff can view all employees" ON employees
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Employee can update own record" ON employees
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admin can manage all employees" ON employees
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated'); -- Assuming all authenticated users are staff/admin for now

-- Policy for Menu Items: Publicly readable (for potential customer-facing menu), but only staff can manage
CREATE POLICY "Menu items are public" ON menu_items
  FOR SELECT USING (TRUE);
CREATE POLICY "Staff can manage menu items" ON menu_items
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Policy for Orders: Staff can view and manage all orders
CREATE POLICY "Staff can view all orders" ON orders
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Staff can manage orders" ON orders
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Policy for Order Items: Staff can view and manage all order items
CREATE POLICY "Staff can view all order items" ON order_items
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Staff can manage order items" ON order_items
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- ------------------------------------------------------------------------------------------------
-- 4. Trigger Function: Inventory Management on Order Completion
-- ------------------------------------------------------------------------------------------------

-- Function to update inventory stock level when an order is completed
CREATE OR REPLACE FUNCTION handle_order_completion()
RETURNS TRIGGER AS $$
DECLARE
    item_record RECORD;
BEGIN
    -- Check if the order status is being updated to 'completed'
    IF NEW.status = 'completed' AND OLD.status <> 'completed' THEN
        -- Loop through all items in the completed order
        FOR item_record IN
            SELECT
                oi.menu_item_id,
                oi.quantity
            FROM
                order_items oi
            WHERE
                oi.order_id = NEW.id
        LOOP
            -- For simplicity, we assume a 1:1 relationship between menu_item and inventory item
            -- In a real app, a recipe/BOM table would be needed
            UPDATE inventory
            SET stock_level = stock_level - item_record.quantity
            WHERE id = item_record.menu_item_id; -- Assuming menu_item_id is the same as inventory item id
        END LOOP;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function after an order is updated
CREATE TRIGGER update_inventory_on_order_complete
AFTER UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION handle_order_completion();

-- ------------------------------------------------------------------------------------------------
-- 5. Trigger Function: Low Stock Notification (Simulated)
-- ------------------------------------------------------------------------------------------------

-- Function to check for low stock and potentially send a notification (e.g., to a separate table or service)
CREATE OR REPLACE FUNCTION check_low_stock()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.stock_level < NEW.low_stock_threshold AND NEW.stock_level <> OLD.stock_level THEN
        -- In a real application, this would insert a record into a 'notifications' table
        -- or call a webhook to an external service (e.g., Slack, Email)
        RAISE NOTICE 'Low stock alert for item: % (Current: %, Threshold: %)', NEW.name, NEW.stock_level, NEW.low_stock_threshold;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function after an inventory item is updated
CREATE TRIGGER low_stock_alert
AFTER UPDATE ON inventory
FOR EACH ROW
EXECUTE FUNCTION check_low_stock();
