import Link from 'next/link';
import { Icon, type IconName } from '@/components/Icon';
import { progressPct, statusColor, stepDateLabels } from '@/lib/projects';

export function StatusPill({ status, large }: { status: string; large?: boolean }) {
  const c = statusColor(status);
  return (
    <span className="pill" style={{ color: c, background: `${c}18`, ...(large ? { fontSize: 13, padding: '6px 14px' } : {}) }}>
      {status}
    </span>
  );
}

export function ProgressBar({ steps, status, height = 5 }: { steps: { doneAt: Date | null }[]; status: string; height?: number }) {
  const pct = progressPct(steps);
  return (
    <div>
      <div className="progress-row"><span>Progress</span><strong>{pct}%</strong></div>
      <div className="progress" style={{ height }} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div style={{ width: `${pct}%`, background: statusColor(status) }} />
      </div>
    </div>
  );
}

type CardProject = { code: string; title: string; status: string; createdAt: Date; steps: { doneAt: Date | null }[]; owner?: { name: string; email: string } };

export function ProjectCard({ p, href }: { p: CardProject; href: string }) {
  return (
    <Link href={href} className="project-card">
      <div className="project-card-head">
        <div>
          <div className="project-title">{p.title}</div>
          <div className="project-meta">
            {p.code} · {p.owner ? <><strong>{p.owner.name}</strong> · {p.owner.email}</> : <>Started {p.createdAt.toISOString().slice(0, 10)}</>}
          </div>
        </div>
        <StatusPill status={p.status} />
      </div>
      <ProgressBar steps={p.steps} status={p.status} height={p.owner ? 4 : 5} />
    </Link>
  );
}

export function Kpi({ label, value, icon, color }: { label: string; value: number; icon: IconName; color: string }) {
  return (
    <div className="kpi">
      <div className="kpi-icon"><Icon name={icon} size={17} color={color} /></div>
      <div>
        <div className="kpi-value">{value}</div>
        <div className="kpi-label">{label}</div>
      </div>
    </div>
  );
}

/** Read-only vertical timeline (researcher view). */
export function Timeline({ steps, status }: { steps: { id: number; label: string; doneAt: Date | null }[]; status: string }) {
  const labels = stepDateLabels(steps, status);
  if (steps.length === 0) return <p className="empty">No steps have been added yet.</p>;
  return (
    <ol style={{ listStyle: 'none' }}>
      {steps.map((step, i) => {
        const done = !!step.doneAt;
        const last = i === steps.length - 1;
        return (
          <li key={step.id} className="timeline-step">
            <div className="timeline-rail">
              <div className={`timeline-dot${done ? ' done' : ''}`}>{done && <Icon name="check" size={12} color="#fff" />}</div>
              {!last && <div className={`timeline-line${done ? ' done' : ''}`} />}
            </div>
            <div style={{ paddingBottom: last ? 0 : 28, paddingTop: 3 }}>
              <div className={`timeline-label${done ? ' done' : ''}`}>{step.label}</div>
              <div className={`timeline-date${done ? ' done' : ''}`}>{labels[i]}</div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
