import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FileList, UploadButton } from '@/components/portal/Files';
import { requireAdmin } from '@/lib/auth';
import { getProjectByCode } from '@/lib/queries';
import { DeleteProjectButton, ProjectStatusSelect, StepEditor } from '../../AdminControls';

export const metadata: Metadata = { title: 'Manage project' };

export default async function AdminProjectPage({ params }: PageProps<'/portal/admin/projects/[code]'>) {
  await requireAdmin();
  const { code } = await params;
  const p = await getProjectByCode(code);
  if (!p) notFound();

  return (
    <div>
      <Link href="/portal/admin/projects" className="back-link" style={{ marginBottom: 24 }}>← Back to projects</Link>
      <div className="detail-head" style={{ marginBottom: 28 }}>
        <div>
          <h1 className="detail-title" style={{ fontSize: 24, marginBottom: 4 }}>{p.title}</h1>
          <div className="project-meta" style={{ fontSize: 13 }}>
            {p.code} · {p.owner.name} · <a href={`mailto:${p.owner.email}`}>{p.owner.email}</a> · {p.serviceType}
          </div>
        </div>
        <div className="detail-actions">
          <ProjectStatusSelect projectId={p.id} status={p.status} />
        </div>
      </div>
      <section className="panel">
        <h2 className="panel-h" style={{ fontSize: 16, marginBottom: 20 }}>
          Progress <span style={{ fontFamily: 'var(--font-text)', fontSize: 13, fontWeight: 400, color: 'var(--ink48)' }}>— click any step to toggle</span>
        </h2>
        <StepEditor projectId={p.id} steps={p.steps} status={p.status} />
      </section>
      <section className="panel">
        <div className="panel-head">
          <h2 className="panel-h" style={{ fontSize: 16 }}>Shared files</h2>
          <UploadButton projectId={p.id} label="Upload file" />
        </div>
        <FileList files={p.files.map((f) => ({ ...f, canDelete: true, uploader: f.uploadedBy?.role === 'admin' ? 'CORE EV' : f.uploadedBy?.name ?? 'Removed user' }))} />
      </section>
      <div style={{ marginTop: 28 }}>
        <DeleteProjectButton projectId={p.id} code={p.code} />
      </div>
    </div>
  );
}
