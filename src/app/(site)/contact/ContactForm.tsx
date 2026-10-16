'use client';

import Link from 'next/link';
import { useActionState, useState } from 'react';
import { sendContactMessage, type FormState } from '@/actions/contact';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { CONTACT_SUBJECTS } from '@/lib/content';

export function ContactForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(sendContactMessage, {});
  const [formKey, setFormKey] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const v = state.values ?? {};

  if (state.ok && !dismissed) {
    return (
      <div className="success-panel" role="status">
        <div className="badge-circle"><Icon name="check" size={24} color="#fff" /></div>
        <div>
          <h2 className="display" style={{ fontSize: 28, letterSpacing: -0.3, margin: '0 0 8px' }}>Message sent.</h2>
          <p className="muted" style={{ fontSize: 16 }}>We&apos;ll be in touch within one business day.</p>
        </div>
        <Button onClick={() => { setDismissed(true); setFormKey((k) => k + 1); }}>Send another</Button>
      </div>
    );
  }

  return (
    <form key={formKey} action={(fd) => { setDismissed(false); action(fd); }} className="form">
      <div className="form-row">
        <div>
          <label className="field-label" htmlFor="c-name">Name</label>
          <input id="c-name" name="name" defaultValue={v.name} className="input" required placeholder="Your name" autoComplete="name" />
        </div>
        <div>
          <label className="field-label" htmlFor="c-email">Email</label>
          <input id="c-email" name="email" defaultValue={v.email} type="email" className="input" required placeholder="your@email.edu" autoComplete="email" />
        </div>
      </div>
      <div>
        <label className="field-label" htmlFor="c-inst">Institution</label>
        <input id="c-inst" name="institution" defaultValue={v.institution} className="input" placeholder="University / organisation" autoComplete="organization" />
      </div>
      <div>
        <label className="field-label" htmlFor="c-subject">Subject</label>
        <select id="c-subject" name="subject" className="input" defaultValue={v.subject ?? ''}>
          <option value="">Select a topic…</option>
          {CONTACT_SUBJECTS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="field-label" htmlFor="c-msg">Message</label>
        <textarea id="c-msg" name="message" defaultValue={v.message} className="input" required placeholder="Describe your sample type, scientific question, and timeline…" />
      </div>
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="c-website">Website</label>
        <input id="c-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {state.error && <div className="alert-error" role="alert">{state.error}</div>}
      <p className="form-note">We use your details only to answer your message. See our <Link href="/privacy">privacy notice</Link>.</p>
      <Button type="submit" disabled={pending} style={{ alignSelf: 'flex-start', marginTop: 8 }}>
        {pending ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  );
}
