import type { Metadata } from 'next';
import { listFilesUploadedBy, listProjectsForUser } from '@/lib/queries';
import { requireResearcher } from '../guard';
import { UploadArea } from './UploadArea';

export const metadata: Metadata = { title: 'Upload files' };

export default async function UploadPage() {
  const user = await requireResearcher();
  const [projects, uploaded] = await Promise.all([listProjectsForUser(user.id), listFilesUploadedBy(user.id)]);
  return (
    <div>
      <h1 className="p-title">Upload files</h1>
      <p className="p-sub">Share sample intake forms, protocols, and data with our team.</p>
      {projects.length === 0 ? (
        <p className="empty">Uploads become available once the facility has set up a project for you. Use “Contact facility” to get started.</p>
      ) : (
        <UploadArea projects={projects.map((p) => ({ id: p.id, code: p.code, title: p.title }))} uploaded={uploaded} />
      )}
    </div>
  );
}
