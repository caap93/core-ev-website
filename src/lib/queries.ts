import 'server-only';
import { and, asc, count, desc, eq, isNull } from 'drizzle-orm';
import { db, schema } from './db';
import type { SessionUser } from './auth';

const projectWith = {
  owner: { columns: { id: true, name: true, email: true } },
  steps: { orderBy: () => [asc(schema.projectSteps.position), asc(schema.projectSteps.id)] },
  files: {
    orderBy: () => [desc(schema.projectFiles.createdAt)],
    with: { uploadedBy: { columns: { id: true, name: true, role: true } } },
  },
} as const;

export type ProjectWithDetails = NonNullable<Awaited<ReturnType<typeof getProjectByCode>>>;

export function listProjectsForUser(userId: string) {
  return db.query.projects.findMany({
    where: eq(schema.projects.ownerId, userId),
    orderBy: [desc(schema.projects.createdAt)],
    with: projectWith,
  });
}

export function listAllProjects() {
  return db.query.projects.findMany({
    orderBy: [desc(schema.projects.createdAt)],
    with: projectWith,
  });
}

export function getProjectByCode(code: string) {
  return db.query.projects.findFirst({ where: eq(schema.projects.code, code), with: projectWith });
}

/** A project the given user may see: admins see all, researchers only their own. */
export async function getAccessibleProject(user: SessionUser, code: string) {
  const project = await getProjectByCode(code);
  if (!project) return null;
  if (user.role !== 'admin' && project.ownerId !== user.id) return null;
  return project;
}

export async function getAccessibleProjectById(user: SessionUser, id: number) {
  const project = await db.query.projects.findFirst({ where: eq(schema.projects.id, id) });
  if (!project) return null;
  if (user.role !== 'admin' && project.ownerId !== user.id) return null;
  return project;
}

export async function listUsersWithProjectCounts() {
  const rows = await db
    .select({ user: schema.users, projects: count(schema.projects.id) })
    .from(schema.users)
    .leftJoin(schema.projects, eq(schema.projects.ownerId, schema.users.id))
    .groupBy(schema.users.id)
    .orderBy(desc(schema.users.createdAt));
  return rows.map((r) => ({ ...r.user, projectCount: Number(r.projects) }));
}

export function listResearchers() {
  return db.query.users.findMany({
    where: eq(schema.users.role, 'researcher'),
    orderBy: [asc(schema.users.name)],
    columns: { id: true, name: true, email: true, status: true },
  });
}

export function listInstruments() {
  return db.query.instruments.findMany({ orderBy: [asc(schema.instruments.position)] });
}

export function listMessages() {
  return db.query.messages.findMany({
    orderBy: [desc(schema.messages.createdAt)],
    with: { project: { columns: { code: true, title: true } } },
    limit: 200,
  });
}

export async function countUnreadMessages() {
  const [row] = await db.select({ n: count() }).from(schema.messages).where(isNull(schema.messages.readAt));
  return Number(row?.n ?? 0);
}

export function listFilesUploadedBy(userId: string) {
  return db
    .select({
      id: schema.projectFiles.id,
      originalName: schema.projectFiles.originalName,
      sizeBytes: schema.projectFiles.sizeBytes,
      createdAt: schema.projectFiles.createdAt,
      projectCode: schema.projects.code,
    })
    .from(schema.projectFiles)
    .innerJoin(schema.projects, eq(schema.projectFiles.projectId, schema.projects.id))
    .where(and(eq(schema.projectFiles.uploadedById, userId), eq(schema.projects.ownerId, userId)))
    .orderBy(desc(schema.projectFiles.createdAt));
}
