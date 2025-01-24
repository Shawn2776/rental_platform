// app/page.js

import { query } from "@/lib/db";

async function getData() {
  const result = await query("SELECT version()");
  return result[0].version;
}

export default async function Page() {
  const data = await getData();
  return (
    <div>
      <h1>Database Version:</h1>
      <p>{data}</p>
    </div>
  );
}
