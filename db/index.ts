import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env";

const client = postgres(env.DATABASE_URL);
const db = drizzle(client, { schema });

export { db };
