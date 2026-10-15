import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/lib/auth';
import { db, schema } from '@/lib/db';
import { isAllowedUpload, MAX_UPLOAD_BYTES } from '@/lib/projects';
import { getAccessibleProjectById } from '@/lib/queries';
import { deleteStoredFile, saveUpload } from '@/lib/storage';

/** Upload one or more files (multipart field "files") to a project the user can access. */
export async function POST(req: Request, ctx: RouteContext<'/api/projects/[id]/files'>) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: 'Please sign in again.' }, { status: 401 });
  const { id } = await ctx.params;
  const project = await getAccessibleProjectById(user, Number(id));
  if (!project) return Response.json({ error: 'Project not found.' }, { status: 404 });

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return Response.json({ error: 'Upload failed — the request was not valid.' }, { status: 400 });
  }
  const files = form.getAll('files').filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length === 0) return Response.json({ error: 'No files received.' }, { status: 400 });
  for (const f of files) {
    if (f.size > MAX_UPLOAD_BYTES) return Response.json({ error: `${f.name} is larger than 50 MB.` }, { status: 413 });
    if (!isAllowedUpload(f.name)) return Response.json({ error: `${f.name}: this file type is not accepted.` }, { status: 415 });
  }

  const saved: string[] = [];
  try {
    for (const f of files) {
      const storedName = await saveUpload(f);
      saved.push(storedName);
      await db.insert(schema.projectFiles).values({
        projectId: project.id, uploadedById: user.id, originalName: f.name.slice(0, 255),
        storedName, mimeType: f.type || 'application/octet-stream', sizeBytes: f.size,
      });
    }
  } catch (err) {
    console.error('[upload] failed', err);
    await Promise.all(saved.map(deleteStoredFile));
    return Response.json({ error: 'Upload failed. Please try again.' }, { status: 500 });
  }

  revalidatePath('/portal', 'layout');
  return Response.json({ ok: true, count: files.length });
}
