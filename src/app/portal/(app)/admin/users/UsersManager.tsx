'use client';

import { useActionState, useEffect, useState, useTransition } from 'react';
import { inviteUser, reissueInvite, removeUser, type InviteResult } from '@/actions/admin';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { initials } from '@/lib/projects';

type U = { id: string; name: string; email: string; institution: string; role: string; status: string; projectCount: number };

export function UsersManager({ users, currentUserId }: { users: U[]; currentUserId: string }) {
  const [showInvite, setShowInvite] = useState(false);
  const [sent, setSent] = useState<InviteResult | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');
  const [pending, start] = useTransition();

  function copyLink(u: U) {
    start(async () => {
      const r = await reissueInvite(u.id, false);
      if (r.error || !r.link) return setError(r.error ?? 'Could not create a link.');
      await navigator.clipboard?.writeText(r.link).catch(() => {});
      setCopied(u.id);
      setTimeout(() => setCopied(''), 2000);
    });
  }

  function resend(u: U) {
    start(async () => {
      const r = await reissueInvite(u.id, true);
      if (r.error) return setError(r.error);
      setSent(r);
    });
  }

  function remove(u: U) {
    const msg = u.status === 'pending'
      ? `Revoke the invitation for ${u.email}?`
      : `Remove ${u.name}? They will lose access to the portal immediately.`;
    if (!window.confirm(msg)) return;
    start(async () => {
      const r = await removeUser(u.id);
      setError(r.error ?? '');
    });
  }

  return (
    <div>
      <div className="p-head">
        <div>
          <h1 className="p-title admin">Users</h1>
          <p className="p-sub admin" style={{ margin: 0 }}>Researchers with access to the portal.</p>
        </div>
        <Button onClick={() => setShowInvite(true)}><Icon name="plus" size={15} color="#fff" /> Invite researcher</Button>
      </div>

      {error && <div className="alert-error" role="alert" style={{ marginBottom: 16 }}>{error}</div>}

      <div className="stack tight" style={{ opacity: pending ? 0.7 : 1 }}>
        {users.map((u) => {
          const isPending = u.status === 'pending';
          return (
            <div key={u.id} className="user-row">
              <div className={`avatar lg${isPending ? ' pending' : ''}`}>{initials(u.name)}</div>
              <div className="user-row-main">
                <div className="user-row-name">
                  {u.name}
                  {u.role === 'admin' && <span className="pill" style={{ fontSize: 11, padding: '2px 10px', color: 'var(--blue)', background: '#0066cc18' }}>Admin</span>}
                  {isPending && <span className="pill" style={{ fontSize: 11, padding: '2px 10px', color: 'var(--amber)', background: '#8a600018' }}>Invite pending</span>}
                </div>
                <div className="user-row-meta">{u.email}{u.institution && ` · ${u.institution}`}</div>
              </div>
              {isPending ? (
                <div className="user-row-actions">
                  <button className="ghost-btn" onClick={() => copyLink(u)} title="Create a new invite link and copy it (earlier links stop working)">
                    <Icon name="copy" size={13} /> {copied === u.id ? 'Copied' : 'Copy link'}
                  </button>
                  <button className="ghost-btn blue" onClick={() => resend(u)}><Icon name="send" size={13} /> Resend</button>
                  <button className="icon-btn" onClick={() => remove(u)} title="Revoke invite" aria-label={`Revoke invite for ${u.email}`}><Icon name="x" size={14} /></button>
                </div>
              ) : (
                <div className="user-row-actions" style={{ gap: 18 }}>
                  <div style={{ textAlign: 'right' }}>
                    <div className="display" style={{ fontSize: 22, lineHeight: 1, letterSpacing: 0 }}>{u.projectCount}</div>
                    <div className="muted" style={{ fontSize: 12 }}>project{u.projectCount !== 1 ? 's' : ''}</div>
                  </div>
                  {u.id !== currentUserId && (
                    <button className="icon-btn" onClick={() => remove(u)} title="Remove user" aria-label={`Remove ${u.name}`}><Icon name="x" size={14} /></button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showInvite && <InviteModal onClose={() => setShowInvite(false)} onSent={(r) => { setShowInvite(false); setSent(r); }} />}
      {sent && <SentModal result={sent} onClose={() => setSent(null)} />}
    </div>
  );
}

function Modal({ onClose, children, label }: { onClose: () => void; children: React.ReactNode; label: string }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={label} onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

function InviteModal({ onClose, onSent }: { onClose: () => void; onSent: (r: InviteResult) => void }) {
  const [state, action, pending] = useActionState<InviteResult, FormData>(inviteUser, {});
  useEffect(() => { if (state.ok) onSent(state); }, [state, onSent]);
  return (
    <Modal onClose={onClose} label="Invite a researcher">
      <h2>Invite a researcher</h2>
      <p className="modal-sub">They&apos;ll get an email with a link to set their own password and access the portal.</p>
      <form action={action} className="form">
        <div>
          <label className="field-label" htmlFor="i-name">Name</label>
          <input id="i-name" name="name" className="input input-sm" required autoFocus placeholder="Dr. ..." />
        </div>
        <div>
          <label className="field-label" htmlFor="i-email">Email</label>
          <input id="i-email" name="email" type="email" className="input input-sm" required placeholder="researcher@institution.edu" />
        </div>
        <div>
          <label className="field-label" htmlFor="i-inst">Institution</label>
          <input id="i-inst" name="institution" className="input input-sm" required placeholder="e.g. UGent – Dept. of Biology" />
        </div>
        {state.error && <div className="alert-error" role="alert">{state.error}</div>}
        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          <Button type="submit" disabled={pending}>{pending ? 'Sending…' : 'Send invite'}</Button>
          <button type="button" className="link-btn" style={{ fontSize: 15, color: 'var(--ink48)', padding: '11px 8px' }} onClick={onClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}

function SentModal({ result, onClose }: { result: InviteResult; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  return (
    <Modal onClose={onClose} label="Invitation sent">
      <div className="center">
        <div className="badge-circle" style={{ width: 48, height: 48, margin: '0 auto 16px' }}><Icon name="mail" size={20} color="#fff" /></div>
        <h2>{result.emailed ? 'Invitation sent.' : 'Invitation created.'}</h2>
        <p className="modal-sub">
          {result.emailed
            ? <>An email with a link to set a password was sent to <strong>{result.email}</strong>. The link expires in 7 days.</>
            : <>Email delivery isn&apos;t configured, so no email went out. Send <strong>{result.name}</strong> this link yourself — it expires in 7 days.</>}
        </p>
      </div>
      {result.link && (
        <div className="link-box" style={{ marginBottom: 20 }}>
          <span>{result.link}</span>
          <button className="ghost-btn" onClick={() => { navigator.clipboard?.writeText(result.link!).catch(() => {}); setCopied(true); }}>
            <Icon name="copy" size={13} /> {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
      <div className="center"><Button onClick={onClose}>Done</Button></div>
    </Modal>
  );
}
