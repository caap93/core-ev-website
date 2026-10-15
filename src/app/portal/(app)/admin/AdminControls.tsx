'use client';

import { useState, useTransition } from 'react';
import { addStep, deleteProject, removeStep, setInstrumentStatus, setMessageRead, toggleStep, updateProjectStatus } from '@/actions/admin';
import { Icon } from '@/components/Icon';
import { INSTRUMENT_COLORS, INSTRUMENT_STATUSES, PROJECT_STATUSES, statusColor, stepDateLabels } from '@/lib/projects';

export function InstrumentStatus({ id, status }: { id: number; status: string }) {
  const [pending, start] = useTransition();
  const c = INSTRUMENT_COLORS[status] ?? '#7a7a7a';
  return (
    <select aria-label="Instrument status" value={status} disabled={pending}
      onChange={(e) => { const v = e.target.value; start(() => setInstrumentStatus(id, v)); }}
      style={{ color: c, background: `${c}18` }}>
      {INSTRUMENT_STATUSES.map((s) => <option key={s}>{s}</option>)}
    </select>
  );
}

export function ProjectStatusSelect({ projectId, status }: { projectId: number; status: string }) {
  const [pending, start] = useTransition();
  const c = statusColor(status);
  return (
    <select aria-label="Project status" className="status-select" value={status} disabled={pending}
      onChange={(e) => { const v = e.target.value; start(() => updateProjectStatus(projectId, v)); }}
      style={{ color: c, background: `${c}18`, border: `1px solid ${c}55` }}>
      {PROJECT_STATUSES.map((s) => <option key={s}>{s}</option>)}
    </select>
  );
}

type Step = { id: number; label: string; doneAt: Date | null };

/** Admin progress editor: click to toggle, × to remove, input row to add. */
export function StepEditor({ projectId, steps, status }: { projectId: number; steps: Step[]; status: string }) {
  const [pending, start] = useTransition();
  const [label, setLabel] = useState('');
  const labels = stepDateLabels(steps, status);

  function submit() {
    const v = label.trim();
    if (!v) return;
    setLabel('');
    start(() => addStep(projectId, v));
  }

  return (
    <div style={{ opacity: pending ? 0.7 : 1 }}>
      {steps.map((step, i) => (
        <div key={step.id} className={`admin-step${step.doneAt ? ' done' : ''}`}>
          <button type="button" className="admin-step-toggle" aria-pressed={!!step.doneAt} onClick={() => start(() => toggleStep(step.id))}>
            <span className="admin-step-dot">{step.doneAt && <Icon name="check" size={11} color="#fff" />}</span>
            <span className="admin-step-label">{step.label}</span>
          </button>
          <span className="file-meta">{labels[i]}</span>
          <button type="button" className="icon-btn" title="Remove step" aria-label={`Remove step ${step.label}`}
            onClick={() => { if (window.confirm(`Remove the step “${step.label}”?`)) start(() => removeStep(step.id)); }}>
            <Icon name="x" size={13} />
          </button>
        </div>
      ))}
      <div className="add-step">
        <Icon name="plus" size={14} />
        <input value={label} onChange={(e) => setLabel(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') submit(); }} placeholder="Add a step…" aria-label="New step" maxLength={200} />
        <button type="button" onClick={submit} disabled={!label.trim()}>Add</button>
      </div>
    </div>
  );
}

export function DeleteProjectButton({ projectId, code }: { projectId: number; code: string }) {
  const [pending, start] = useTransition();
  return (
    <button type="button" className="outline-pill danger" disabled={pending}
      onClick={() => { if (window.confirm(`Delete ${code} with all its steps and files? This can't be undone.`)) start(() => deleteProject(projectId)); }}>
      <Icon name="x" size={13} /> {pending ? 'Deleting…' : 'Delete project'}
    </button>
  );
}

export function ReadToggle({ id, read }: { id: number; read: boolean }) {
  const [pending, start] = useTransition();
  return (
    <button type="button" className="link-btn" style={{ fontSize: 12 }} disabled={pending} onClick={() => start(() => setMessageRead(id, !read))}>
      {read ? 'Mark as unread' : 'Mark as read'}
    </button>
  );
}
