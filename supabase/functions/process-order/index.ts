import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY"); // Using anon key for simplicity, but service role key is safer for server-side
const supabase = createClient(supabaseUrl!, supabaseKey!);

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { order_id } = await req.json();

    if (!order_id) {
      return new Response(JSON.stringify({ error: "Missing order_id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 1. Fetch Order Details (Simulated)
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, total_amount, status")
      .eq("id", order_id)
      .single();

    if (orderError || !order) {
      console.error("Error fetching order:", orderError);
      return new Response(JSON.stringify({ error: "Order not found or database error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2. Simulate Complex Payment Processing
    // In a real scenario, this would integrate with a payment gateway (e.g., Stripe, Omise)
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

    // 3. Update Order Status
    const { error: updateError } = await supabase
      .from("orders")
      .update({ status: "completed", payment_status: "paid" })
      .eq("id", order_id);

    if (updateError) {
      console.error("Error updating order status:", updateError);
      return new Response(JSON.stringify({ error: "Failed to update order status" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Note: Inventory update is handled by the PostgreSQL Trigger Function (handle_order_completion)

    return new Response(
      JSON.stringify({
        message: "Order processed successfully",
        order_id: order_id,
        new_status: "completed",
        inventory_update_triggered: true,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("General error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
