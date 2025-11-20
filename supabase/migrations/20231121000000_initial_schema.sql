-- Table for Inventory Management
CREATE TABLE inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT,
  stock_level INT DEFAULT 0,
  unit TEXT,
  price NUMERIC(10, 2) DEFAULT 0.00,
  low_stock_threshold INT DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table for HRM (Employees)
CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT,
  hourly_rate NUMERIC(10, 2) DEFAULT 0.00,
  contact_email TEXT UNIQUE,
  hire_date DATE,
  is_active BOOLEAN DEFAULT TRUE
);

-- Table for CMS (Menu Items)
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  price NUMERIC(10, 2) DEFAULT 0.00,
  is_active BOOLEAN DEFAULT TRUE,
  image_url TEXT
);

-- Table for POS (Orders)
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_number INT,
  total_amount NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, completed, cancelled
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
