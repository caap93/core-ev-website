import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/Icon';
import { FileList, UploadButton } from '@/components/portal/Files';
import { StatusPill, Timeline } from '@/components/portal/ProjectBits';
import { getAccessibleProject } from '@/lib/queries';
import { requireResearcher } from '../../guard';

export const metadata: Metadata = { title: 'Project' };

export default async function ProjectDetailPage({ params }: PageProps<'/portal/projects/[code]'>) {
  const user = await requireResearcher();
  const { code } = await params;
  const p = await getAccessibleProject(user, code);
  if (!p) notFound();

  return (
    <div>
      <Link href="/portal/projects" className="back-link">← Back to projects</Link>
      <div className="detail-head">
        <div>
          <h1 className="detail-title">{p.title}</h1>
          <div className="project-meta" style={{ fontSize: 13 }}>{p.code} · Started {p.createdAt.toISOString().slice(0, 10)}</div>
        </div>
        <div className="detail-actions">
          <StatusPill status={p.status} large />
          <Link href={`/portal/messages?project=${p.id}`} className="outline-pill">
            <Icon name="mail" size={13} color="var(--blue)" /> Contact about this project
          </Link>
        </div>
      </div>
      <section className="panel">
        <h2 className="panel-h" style={{ marginBottom: 28 }}>Project progress</h2>
        <Timeline steps={p.steps} status={p.status} />
      </section>
      <section className="panel">
        <div className="panel-head">
          <h2 className="panel-h">Shared files</h2>
          <UploadButton projectId={p.id} label="Upload to this project" />
        </div>
        <FileList files={p.files.map((f) => ({ ...f, canDelete: f.uploadedById === user.id, uploader: f.uploadedBy?.role === 'admin' ? 'CORE EV' : undefined }))} />
      </section>
    </div>
  );
}
