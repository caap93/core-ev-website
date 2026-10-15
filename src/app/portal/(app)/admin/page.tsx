import type { Metadata } from 'next';
import Link from 'next/link';
import { Kpi, StatusPill } from '@/components/portal/ProjectBits';
import { requireAdmin } from '@/lib/auth';
import { listAllProjects, listInstruments } from '@/lib/queries';
import { InstrumentStatus } from './AdminControls';

export const metadata: Metadata = { title: 'Admin dashboard' };

export default async function AdminOverviewPage() {
  await requireAdmin();
  const [projects, instruments] = await Promise.all([listAllProjects(), listInstruments()]);
  const open = projects.filter((p) => p.status !== 'Completed');
  return (
    <div>
      <h1 className="p-title admin">Admin dashboard</h1>
      <p className="p-sub admin" style={{ marginBottom: 32 }}>Full control over all CORE EV projects and users.</p>
      <div className="kpis four">
        <Kpi label="Total projects" value={projects.length} icon="folder" color="var(--blue)" />
        <Kpi label="Active" value={projects.filter((p) => p.status === 'In Progress').length} icon="activity" color="var(--blue)" />
        <Kpi label="Awaiting sample" value={projects.filter((p) => p.status === 'Awaiting sample').length} icon="clock" color="var(--amber)" />
        <Kpi label="Completed" value={projects.filter((p) => p.status === 'Completed').length} icon="check" color="var(--green)" />
      </div>
      <h2 className="p-h2 sm">Active &amp; pending projects</h2>
      <div className="stack tight" style={{ marginBottom: 36 }}>
        {open.length === 0 && <p className="empty">No open projects. <Link href="/portal/admin/new-project" className="link-btn">Add a project →</Link></p>}
        {open.map((p) => (
          <Link key={p.id} href={`/portal/admin/projects/${p.code}`} className="row-card">
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{p.title}</div>
              <div className="project-meta" style={{ marginTop: 2 }}>{p.code} · {p.owner.name}</div>
            </div>
            <StatusPill status={p.status} />
          </Link>
        ))}
      </div>
      <h2 className="p-h2 sm">Instrument status</h2>
      <div className="instrument-grid">
        {instruments.map((inst) => (
          <div key={inst.id} className="instrument">
            <span>{inst.name}</span>
            <InstrumentStatus id={inst.id} status={inst.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
