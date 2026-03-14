import { drizzle } from "drizzle-orm/node-postgres";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "@/db/schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not configured");
}

type Database = NodePgDatabase<typeof schema>;

declare global {
  var __oauthDemoPool: Pool | undefined;
  var __oauthDemoDb: Database | undefined;
}

const pool =
  globalThis.__oauthDemoPool ??
  new Pool({
    connectionString: databaseUrl,
  });

const db =
  globalThis.__oauthDemoDb ??
  drizzle(pool, {
    schema,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__oauthDemoPool = pool;
  globalThis.__oauthDemoDb = db;
}

export { db, pool };
