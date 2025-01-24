import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function POST(req) {
  try {
    const { equipment_id, customer_name, start_date, end_date, total_price } =
      await req.json();

    const result = await sql`
            INSERT INTO bookings (equipment_id, customer_name, start_date, end_date, total_price)
            VALUES (${equipment_id}, ${customer_name}, ${start_date}, ${end_date}, ${total_price})
            RETURNING *;
        `;

    return new Response(JSON.stringify(result[0]), { status: 201 });
  } catch (error) {
    console.error("Database query error:", error);
    return new Response("Error creating booking", { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const equipment_id = searchParams.get("equipment_id");

    const result = await sql`
            SELECT * FROM bookings WHERE equipment_id = ${equipment_id};
        `;

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Database query error:", error);
    return new Response("Error fetching bookings", { status: 500 });
  }
}
