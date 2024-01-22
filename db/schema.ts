import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import {
	boolean,
	integer,
	json,
	pgTable,
	primaryKey,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("user", {
	id: uuid("id").notNull().primaryKey().defaultRandom(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("email_verified", { mode: "date" }),
	image: text("image"),
	password: text("password"),
	role: text("role").default("user").notNull(),
	twoFactorEnabled: boolean("two_factor_enabled").notNull().default(false),
});

export const usersRelations = relations(users, ({ many, one }) => ({
	projects: many(projectMembers),
	teams: many(teamMembers),
	accounts: many(accounts),
	twoFactorConfirmations: many(twoFactorConfirmations),
}));

const userSelectSchema = createSelectSchema(users);
export type User = z.infer<typeof userSelectSchema>;

export const accounts = pgTable(
	"account",
	{
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccount["type"]>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("provider_account_id").notNull(),
		refreshToken: text("refresh_token"),
		accessToken: text("access_token"),
		expiresAt: integer("expires_at"),
		tokenType: text("token_type"),
		scope: text("scope"),
		idToken: text("id_token"),
		sessionState: text("session_state"),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	}),
);

const accountSelectSchema = createSelectSchema(accounts);
export type Account = z.infer<typeof accountSelectSchema>;

export const sessions = pgTable("session", {
	session_token: text("session_token").notNull().primaryKey(),
	user_id: uuid("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

const sessionSelectSchema = createSelectSchema(sessions);
export type Session = z.infer<typeof sessionSelectSchema>;

export const verificationTokens = pgTable(
	"verification_token",
	{
		id: uuid("identifier").notNull().defaultRandom(),
		email: text("email").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.email, vt.token] }),
	}),
);

const verificationTokenSelectSchema = createSelectSchema(verificationTokens);
export type VerificationToken = z.infer<typeof verificationTokenSelectSchema>;

export const passwordResetTokens = pgTable(
	"password_reset_token",
	{
		id: uuid("id").notNull().defaultRandom(),
		email: text("email").notNull(),
		token: text("token").notNull().unique(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(prt) => ({
		compoundKey: primaryKey({ columns: [prt.email, prt.token] }),
	}),
);

const passwordResetTokenSelectSchema = createSelectSchema(passwordResetTokens);
export type PasswordResetToken = z.infer<typeof passwordResetTokenSelectSchema>;

export const twoFactorTokens = pgTable(
	"two_factor_token",
	{
		id: uuid("id").notNull().defaultRandom(),
		email: text("email").notNull(),
		token: text("token").notNull().unique(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(tft) => ({
		compoundKey: primaryKey({ columns: [tft.email, tft.token] }),
	}),
);

const twoFactorTokenSelectSchema = createSelectSchema(twoFactorTokens);
export type TwoFactorToken = z.infer<typeof twoFactorTokenSelectSchema>;

export const twoFactorConfirmations = pgTable(
	"two_factor_confirmation",
	{
		id: uuid("id").notNull().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" })
			.unique(),
	},
	(tfc) => ({
		compoundKey: primaryKey({ columns: [tfc.userId, tfc.id] }),
	}),
);

export const twoFactorConfirmationsRelations = relations(
	twoFactorConfirmations,
	({ one }) => ({
		user: one(users, {
			fields: [twoFactorConfirmations.userId],
			references: [users.id],
		}),
	}),
);

export const teams = pgTable("team", {
	id: uuid("id").defaultRandom().notNull().primaryKey(),
	name: text("name").notNull(),
	image: text("image"),
	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const teamsRelations = relations(teams, ({ many, one }) => ({
	projects: many(projects),
	members: many(teamMembers),
	billingAccount: one(subscriptions),
}));

const teamSelectSchema = createSelectSchema(teams);
export type Team = z.infer<typeof teamSelectSchema>;

export const teamMembers = pgTable(
	"team_member",
	{
		teamId: uuid("team_id")
			.defaultRandom()
			.notNull()
			.references(() => teams.id, { onDelete: "cascade" }),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		role: text("role").notNull().default("member"),
	},
	(tm) => ({
		compoundKey: primaryKey({ columns: [tm.teamId, tm.userId] }),
	}),
);

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
	user: one(users, {
		fields: [teamMembers.userId],
		references: [users.id],
	}),
	team: one(teams, {
		fields: [teamMembers.teamId],
		references: [teams.id],
	}),
}));

const teamMemberSelectSchema = createSelectSchema(teamMembers);
export type TeamMember = z.infer<typeof teamMemberSelectSchema>;

export const projects = pgTable("project", {
	id: uuid("id").defaultRandom().notNull().primaryKey(),
	name: text("name").notNull(),
	image: text("image"),
	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
	teamId: uuid("team_id")
		.notNull()
		.references(() => teams.id),
});

export const projectsRelations = relations(projects, ({ many, one }) => ({
	team: one(teams, {
		fields: [projects.teamId],
		references: [teams.id],
	}),
	members: many(projectMembers),
}));

const projectSelectSchema = createSelectSchema(projects);
export type Project = z.infer<typeof projectSelectSchema>;

export const projectMembers = pgTable(
	"project_member",
	{
		projectId: uuid("project_id")
			.defaultRandom()
			.notNull()
			.references(() => projects.id, { onDelete: "cascade" }),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		role: text("role").notNull().default("member"),
	},
	(pm) => ({
		compoundKey: primaryKey({ columns: [pm.projectId, pm.userId] }),
	}),
);

export const projectMembersRelations = relations(projectMembers, ({ one }) => ({
	user: one(users, {
		fields: [projectMembers.userId],
		references: [users.id],
	}),
	project: one(projects, {
		fields: [projectMembers.projectId],
		references: [projects.id],
	}),
}));

const projectMemberSelectSchema = createSelectSchema(projectMembers);
export type ProjectMember = z.infer<typeof projectMemberSelectSchema>;

export const plans = pgTable("plan", {
	id: uuid("id").defaultRandom().notNull().primaryKey(),
	productId: uuid("product_id").notNull(),
	variantId: uuid("variant_id").notNull(),
	name: text("name"),
	description: text("description"),
	variantName: text("variant_name").notNull(),
	sort: integer("sort").notNull().default(0),
	status: text("status").notNull().default("inactive"),
	price: integer("price").notNull(),
	interval: text("interval").notNull(),
	intervalCount: integer("interval_count").notNull().default(1),
});

export const plansRelations = relations(plans, ({ one }) => ({
	subscriptions: one(subscriptions, {
		fields: [plans.id],
		references: [subscriptions.planId],
	}),
}));

const planSelectSchema = createSelectSchema(plans);
export type Plan = z.infer<typeof planSelectSchema>;

export const subscriptions = pgTable(
	"subscription",
	{
		id: uuid("id").defaultRandom().notNull(),
		lemonSqueezyId: integer("lemon_squeezy_id").unique().notNull(),
		orderId: uuid("order_id").notNull().unique(),
		name: text("name").notNull(),
		email: text("email").notNull(),
		status: text("status").notNull(),
		renewsAt: timestamp("renews_at", { mode: "date" }),
		endsAt: timestamp("ends_at", { mode: "date" }),
		trialEndsAt: timestamp("trial_ends_at", { mode: "date" }),
		resumesAt: timestamp("resumes_at", { mode: "date" }),
		price: integer("price").notNull(),
		planId: uuid("plan_id")
			.notNull()
			.references(() => plans.id),
		teamId: uuid("team_id")
			.notNull()
			.references(() => teams.id),
		isUsageBased: boolean("is_usage_based").notNull().default(false),
		subscriptionItemId: uuid("subscription_item_id"),
	},
	(s) => ({
		compoundKey: primaryKey({ columns: [s.planId, s.teamId] }),
	}),
);

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
	team: one(teams, {
		fields: [subscriptions.teamId],
		references: [teams.id],
	}),
	plan: one(plans, {
		fields: [subscriptions.planId],
		references: [plans.id],
	}),
}));

const subscriptionSelectSchema = createSelectSchema(subscriptions);
export type Subscription = z.infer<typeof subscriptionSelectSchema>;

export const lemonSqueeryWebhookEvents = pgTable(
	"lemon_squeezy_webhook_event",
	{
		id: uuid("id").notNull().defaultRandom().primaryKey(),
		createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
		eventName: text("event_name").notNull(),
		processed: boolean("processed").notNull().default(false),
		body: json("body")
			.$type<{
				data: {
					id: string;
					type: string;
					attributes: {
						status: string;
						renews_at: string;
						ends_at: string;
						trial_ends_at: string;
						resumes_at: string;
						order_id: string;
						user_name: string;
						user_email: string;
						first_subscription_item: {
							id: string;
							price_id: string;
							is_usage_based: boolean;
						};
					};
				};
				meta: {
					custom_data: {
						team_id: string;
					};
				};
			}>()
			.notNull(),
		processingError: text("processing_error"),
	},
);

const lemonSqueezyWebhookEventSelectSchema = createSelectSchema(
	lemonSqueeryWebhookEvents,
);
export type LemonSqueezyWebhookEvent = z.infer<
	typeof lemonSqueezyWebhookEventSelectSchema
>;
