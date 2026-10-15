'use client';

import { useActionState, useState } from 'react';
import { sendPortalMessage, type MessageState } from '@/actions/portal';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { PORTAL_SUBJECTS } from '@/lib/content';

type Props = { email: string; projects: { id: number; code: string; title: string }[]; preselect: string };

export function MessageForm({ email, projects, preselect }: Props) {
  const [state, action, pending] = useActionState<MessageState, FormData>(sendPortalMessage, {});
  const [formKey, setFormKey] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const v = state.values ?? {};

  if (state.ok && !dismissed) {
    return (
      <div className="form-card center" style={{ padding: '60px 40px', maxWidth: 560 }} role="status">
        <div className="badge-circle" style={{ width: 52, height: 52, margin: '0 auto 20px' }}><Icon name="check" size={24} color="#fff" /></div>
        <h2 className="display" style={{ fontSize: 24, letterSpacing: -0.3, margin: '0 0 8px' }}>Message sent.</h2>
        <p className="muted" style={{ fontSize: 16, margin: '0 0 24px' }}>We&apos;ll respond to {email} shortly.</p>
        <Button onClick={() => { setDismissed(true); setFormKey((k) => k + 1); }}>Send another</Button>
      </div>
    );
  }

  return (
    <div className="form-card">
      <form key={formKey} action={(fd) => { setDismissed(false); action(fd); }} className="form">
        <div>
          <label className="field-label" htmlFor="m-project">Related project <span className="opt">(optional)</span></label>
          <select id="m-project" name="projectId" className="input" defaultValue={v.projectId ?? preselect}>
            <option value="">No specific project</option>
            {projects.map((p) => <option key={p.id} value={p.id}>{p.code} — {p.title}</option>)}
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="m-subject">Subject</label>
          <select id="m-subject" name="subject" className="input" required defaultValue={v.subject ?? ''}>
            <option value="">Select a topic…</option>
            {PORTAL_SUBJECTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="m-message">Message</label>
          <textarea id="m-message" name="message" className="input" required style={{ minHeight: 160 }} defaultValue={v.message} placeholder="How can we help?" />
        </div>
        {state.error && <div className="alert-error" role="alert">{state.error}</div>}
        <Button type="submit" disabled={pending} style={{ alignSelf: 'flex-start' }}>{pending ? 'Sending…' : 'Send message'}</Button>
      </form>
    </div>
  );
}
