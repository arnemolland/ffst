"use server";

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { env } from "@/env";

const migrationClient = postgres(env.DATABASE_URL, { max: 1, ssl: "allow" });
migrate(drizzle(migrationClient), { migrationsFolder: "./db/migrations" }).then(
	() => {
		console.log("migrations complete");
		process.exit(0);
	},
);
