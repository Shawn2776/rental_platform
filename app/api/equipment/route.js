// app/api/equipment/route.js

import { query } from "@/lib/db";

export async function POST(req) {
  try {
    const { business_id, name, description, price_per_day, available } =
      await req.json();

    const result = await query(
      `
            INSERT INTO equipment (business_id, name, description, price_per_day, available)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
            `,
      [business_id, name, description, price_per_day, available]
    );

    return new Response(JSON.stringify(result[0]), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Error adding equipment", { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const business_id = searchParams.get("business_id");

    const result = await query(
      `
            SELECT * FROM equipment WHERE business_id = $1;
            `,
      [business_id]
    );

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error fetching equipment", { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id, name, description, price_per_day, available } =
      await req.json();

    const result = await query(
      `
            UPDATE equipment
            SET name = $1, description = $2, price_per_day = $3, available = $4
            WHERE id = $5
            RETURNING *;
            `,
      [name, description, price_per_day, available, id]
    );

    return new Response(JSON.stringify(result[0]), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error updating equipment", { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    await query(
      `
            DELETE FROM equipment WHERE id = $1;
            `,
      [id]
    );

    return new Response("Equipment deleted", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error deleting equipment", { status: 500 });
  }
}
