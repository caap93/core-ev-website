import { relations } from 'drizzle-orm';
import { bigint, index, integer, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const USER_ROLES = ['admin', 'researcher'] as const;
export const USER_STATUSES = ['pending', 'active'] as const;
export const TOKEN_KINDS = ['invite', 'reset'] as const;

export type UserRole = (typeof USER_ROLES)[number];
export type UserStatus = (typeof USER_STATUSES)[number];
export type TokenKind = (typeof TOKEN_KINDS)[number];

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  institution: text('institution').notNull().default(''),
  role: text('role').$type<UserRole>().notNull().default('researcher'),
  status: text('status').$type<UserStatus>().notNull().default('pending'),
  passwordHash: text('password_hash'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  activatedAt: timestamp('activated_at', { withTimezone: true }),
});

/** Login sessions. The cookie holds a random token; only its SHA-256 hash is stored. */
export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [index('sessions_user_idx').on(t.userId)]);

/** One-time invite / password-reset tokens (hashed). */
export const authTokens = pgTable('auth_tokens', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  kind: text('kind').$type<TokenKind>().notNull(),
  tokenHash: text('token_hash').notNull().unique(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [index('auth_tokens_user_idx').on(t.userId)]);

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  code: text('code').notNull().unique(),
  title: text('title').notNull(),
  serviceType: text('service_type').notNull(),
  ownerId: uuid('owner_id').notNull().references(() => users.id, { onDelete: 'restrict' }),
  status: text('status').notNull().default('Awaiting sample'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [index('projects_owner_idx').on(t.ownerId)]);

export const projectSteps = pgTable('project_steps', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  label: text('label').notNull(),
  position: integer('position').notNull(),
  doneAt: timestamp('done_at', { withTimezone: true }),
}, (t) => [index('project_steps_project_idx').on(t.projectId)]);

export const projectFiles = pgTable('project_files', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: integer('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  uploadedById: uuid('uploaded_by_id').references(() => users.id, { onDelete: 'set null' }),
  originalName: text('original_name').notNull(),
  storedName: text('stored_name').notNull().unique(),
  mimeType: text('mime_type').notNull(),
  sizeBytes: bigint('size_bytes', { mode: 'number' }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [index('project_files_project_idx').on(t.projectId)]);

/** Messages from the public contact form and from the portal. */
export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  source: text('source').$type<'public' | 'portal'>().notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  projectId: integer('project_id').references(() => projects.id, { onDelete: 'set null' }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  institution: text('institution').notNull().default(''),
  subject: text('subject').notNull(),
  body: text('body').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  readAt: timestamp('read_at', { withTimezone: true }),
});

export const instruments = pgTable('instruments', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  position: integer('position').notNull(),
  status: text('status').notNull().default('Available'),
});

export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  owner: one(users, { fields: [projects.ownerId], references: [users.id] }),
  steps: many(projectSteps),
  files: many(projectFiles),
}));

export const projectStepsRelations = relations(projectSteps, ({ one }) => ({
  project: one(projects, { fields: [projectSteps.projectId], references: [projects.id] }),
}));

export const projectFilesRelations = relations(projectFiles, ({ one }) => ({
  project: one(projects, { fields: [projectFiles.projectId], references: [projects.id] }),
  uploadedBy: one(users, { fields: [projectFiles.uploadedById], references: [users.id] }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  project: one(projects, { fields: [messages.projectId], references: [projects.id] }),
}));

export type User = typeof users.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type ProjectStep = typeof projectSteps.$inferSelect;
export type ProjectFile = typeof projectFiles.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Instrument = typeof instruments.$inferSelect;
