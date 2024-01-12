import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import {
	boolean,
	integer,
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
	billingAccount: one(billingAccounts),
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

export const billingAccounts = pgTable(
	"billing_account",
	{
		id: uuid("id").notNull().defaultRandom(),
		billingMethod: text("billing_method").notNull(),
		accountStatus: text("account_status").notNull(),
		currentBalance: integer("current_balance").notNull(),
		createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
		updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
		stripeCustomerId: text("stripe_customer_id").unique(),
		stripeSubscriptionId: text("stripe_subscription_id").unique(),
		stripePriceId: text("stripe_price_id"),
		stripeCurrentPeriodEnd: timestamp("stripe_current_period_end", {
			mode: "date",
		}),
		teamId: uuid("team_id")
			.unique()
			.notNull()
			.references(() => teams.id),
	},
	(ba) => ({
		compoundKey: primaryKey({ columns: [ba.teamId, ba.id] }),
	}),
);

export const billingAccountsRelations = relations(
	billingAccounts,
	({ one }) => ({
		team: one(teams, {
			fields: [billingAccounts.teamId],
			references: [teams.id],
		}),
	}),
);

const billingAccountSelectSchema = createSelectSchema(billingAccounts);
export type BillingAccount = z.infer<typeof billingAccountSelectSchema>;
