import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';
import { db, schema } from '@/lib/db';
import { getAccessibleProjectById } from '@/lib/queries';
import { openStoredFile } from '@/lib/storage';

/** Streams a project file to a user who may see that project. */
export async function GET(_req: Request, ctx: RouteContext<'/api/files/[id]'>) {
  const user = await getCurrentUser();
  if (!user) return new Response('Unauthorized', { status: 401 });
  const { id } = await ctx.params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return new Response('Not found', { status: 404 });

  const file = await db.query.projectFiles.findFirst({ where: eq(schema.projectFiles.id, id) });
  if (!file || !(await getAccessibleProjectById(user, file.projectId))) return new Response('Not found', { status: 404 });

  let body: ReadableStream;
  try {
    body = openStoredFile(file.storedName);
  } catch {
    return new Response('Not found', { status: 404 });
  }
  return new Response(body, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': String(file.sizeBytes),
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(file.originalName)}`,
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
