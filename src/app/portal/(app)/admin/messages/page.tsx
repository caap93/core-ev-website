import type { Metadata } from 'next';
import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { listMessages } from '@/lib/queries';
import { ReadToggle } from '../AdminControls';

export const metadata: Metadata = { title: 'Messages' };

export default async function AdminMessagesPage() {
  await requireAdmin();
  const messages = await listMessages();
  return (
    <div>
      <h1 className="p-title admin">Messages</h1>
      <p className="p-sub admin">From the website contact form and the user portal. Replies go by email.</p>
      {messages.length === 0 ? (
        <p className="empty">No messages yet.</p>
      ) : (
        <div className="stack tight">
          {messages.map((m) => (
            <article key={m.id} className={`message${m.readAt ? '' : ' unread'}`}>
              <div className="message-head">
                <div>
                  <div className="message-subject">{m.subject}</div>
                  <div className="message-meta">
                    {m.name} · <a href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.subject}`)}`} className="link-btn" style={{ fontSize: 12 }}>{m.email}</a>
                    {m.institution && ` · ${m.institution}`}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="message-meta">
                    {m.source === 'portal' ? 'Portal' : 'Website'} · {m.createdAt.toISOString().slice(0, 16).replace('T', ' ')}
                  </div>
                  <ReadToggle id={m.id} read={!!m.readAt} />
                </div>
              </div>
              {m.project && (
                <Link href={`/portal/admin/projects/${m.project.code}`} className="pill" style={{ display: 'inline-block', color: 'var(--blue)', background: '#0066cc18' }}>
                  {m.project.code} — {m.project.title}
                </Link>
              )}
              <p className="message-body">{m.body}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
