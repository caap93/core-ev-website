'use client';

import Link from 'next/link';
import { useActionState, useState } from 'react';
import { createProject, type CreateProjectResult } from '@/actions/admin';
import { Button, ButtonLink } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { SERVICE_TYPES } from '@/lib/projects';

type Researcher = { id: string; name: string; email: string; status: string };

export function NewProjectForm({ researchers }: { researchers: Researcher[] }) {
  const [state, action, pending] = useActionState<CreateProjectResult, FormData>(createProject, {});
  const [formKey, setFormKey] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  if (state.ok && !dismissed) {
    return (
      <div className="form-card center" style={{ padding: '52px 40px', maxWidth: 480 }} role="status">
        <div className="badge-circle" style={{ width: 48, height: 48, background: 'var(--green)', margin: '0 auto 16px' }}><Icon name="check" size={22} color="#fff" /></div>
        <h2 className="display" style={{ fontSize: 24, letterSpacing: -0.3, margin: '0 0 8px' }}>Project created.</h2>
        <p className="muted" style={{ fontSize: 15, margin: '0 0 20px' }}>{state.code} was added to All projects. The researcher has been notified by email.</p>
        <div className="btn-row">
          <ButtonLink href={`/portal/admin/projects/${state.code}`}>Open project</ButtonLink>
          <Button variant="ghost" onClick={() => { setDismissed(true); setFormKey((k) => k + 1); }}>Add another</Button>
        </div>
      </div>
    );
  }

  return (
    <form key={formKey} action={(fd) => { setDismissed(false); action(fd); }} className="form-card form" style={{ maxWidth: 560 }}>
      <div>
        <label className="field-label" htmlFor="np-owner">Researcher</label>
        <select id="np-owner" name="ownerId" className="input input-sm" required defaultValue="">
          <option value="" disabled>Select a researcher…</option>
          {researchers.map((r) => (
            <option key={r.id} value={r.id}>{r.name} — {r.email}{r.status === 'pending' ? ' (invite pending)' : ''}</option>
          ))}
        </select>
        <p className="muted" style={{ fontSize: 12, marginTop: 6 }}>
          Not listed? <Link href="/portal/admin/users" className="link-btn" style={{ fontSize: 12 }}>Invite them first</Link>.
        </p>
      </div>
      <div>
        <label className="field-label" htmlFor="np-title">Project title</label>
        <input id="np-title" name="title" className="input input-sm" required maxLength={300} placeholder="e.g. Plasma EV characterisation — Cancer cohort" />
      </div>
      <div>
        <label className="field-label" htmlFor="np-type">Service type</label>
        <select id="np-type" name="serviceType" className="input input-sm" defaultValue={SERVICE_TYPES[0]}>
          {SERVICE_TYPES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <p className="muted" style={{ fontSize: 13 }}>The project starts as “Awaiting sample” with the standard six steps — you can add or remove steps afterwards.</p>
      {state.error && <div className="alert-error" role="alert">{state.error}</div>}
      <Button type="submit" disabled={pending} style={{ alignSelf: 'flex-start', marginTop: 6 }}>{pending ? 'Creating…' : 'Create project'}</Button>
    </form>
  );
}
