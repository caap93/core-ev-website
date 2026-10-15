import 'server-only';
import nodemailer, { type Transporter } from 'nodemailer';
import { env } from './env';

type Mail = { to: string; subject: string; text: string; html: string; replyTo?: string };

let transport: Transporter | null = null;

function getTransport() {
  if (!env.smtp.host) return null;
  transport ??= nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.secure,
    auth: env.smtp.user ? { user: env.smtp.user, pass: env.smtp.password } : undefined,
  });
  return transport;
}

/**
 * Sends an email. Without SMTP configured, the mail is written to the server log
 * (so invite/reset links are still recoverable in development). Returns whether
 * the mail was actually handed to an SMTP server.
 */
export async function sendMail(mail: Mail): Promise<boolean> {
  const t = getTransport();
  if (!t) {
    console.info(`[mail] SMTP not configured — would send to ${mail.to}: "${mail.subject}"\n${mail.text}`);
    return false;
  }
  try {
    await t.sendMail({ from: env.mailFrom, ...mail });
    return true;
  } catch (err) {
    console.error('[mail] Failed to send', err);
    return false;
  }
}

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

/** Branded HTML email body matching the site (parchment card, blue pill button). */
function layout({ heading, body, cta, footnote }: { heading: string; body: string; cta?: { label: string; url: string }; footnote?: string }) {
  const font = `-apple-system, system-ui, 'Segoe UI', Inter, sans-serif`;
  return `<!doctype html><html><body style="margin:0;background:#ffffff;font-family:${font};color:#1d1d1f">
<div style="max-width:520px;margin:0 auto;padding:32px 20px">
  <div style="background:#f5f5f7;border-radius:14px;padding:36px 28px;text-align:center">
    <img src="${env.appUrl}/images/core-ev-icon.png" alt="CORE EV" height="36" style="display:block;margin:0 auto 18px;height:36px">
    <h1 style="font-size:20px;font-weight:600;letter-spacing:-0.3px;margin:0 0 12px">${esc(heading)}</h1>
    <div style="font-size:15px;line-height:1.55;color:#333333;margin:0 0 24px">${body}</div>
    ${cta ? `<a href="${cta.url}" style="display:inline-block;background:#0066cc;color:#ffffff;text-decoration:none;border-radius:9999px;padding:11px 22px;font-size:16px">${esc(cta.label)}</a>` : ''}
    ${footnote ? `<p style="font-size:12px;color:#7a7a7a;margin:20px 0 0">${esc(footnote)}</p>` : ''}
  </div>
  <p style="font-size:12px;color:#7a7a7a;text-align:center;margin:18px 0 0">CORE Extracellular Vesicles · Ghent University</p>
</div></body></html>`;
}

function firstName(name: string) {
  const parts = name.replace(/^(dr\.?|prof\.?|mr\.?|ms\.?|mrs\.?)\s+/i, '').split(/\s+/).filter(Boolean);
  return parts[0] ?? name;
}

export function inviteMail(to: { name: string; email: string }, link: string): Mail {
  const hi = `Hi ${firstName(to.name)}, an account has been created for you to track your projects at CORE Extracellular Vesicles. Set a password to get started.`;
  return {
    to: to.email,
    subject: "You've been invited to the CORE EV portal",
    text: `${hi}\n\nSet your password: ${link}\n\nThis link expires in 7 days.`,
    html: layout({ heading: "You've been invited to the CORE EV portal.", body: esc(hi), cta: { label: 'Set your password', url: link }, footnote: 'This link expires in 7 days.' }),
  };
}

export function resetMail(to: { name: string; email: string }, link: string): Mail {
  const body = `Hi ${firstName(to.name)}, we received a request to reset the password for your CORE EV portal account. If you didn't ask for this, you can ignore this email.`;
  return {
    to: to.email,
    subject: 'Reset your CORE EV portal password',
    text: `${body}\n\nReset your password: ${link}\n\nThis link expires in 1 hour.`,
    html: layout({ heading: 'Reset your password.', body: esc(body), cta: { label: 'Reset password', url: link }, footnote: 'This link expires in 1 hour.' }),
  };
}

export function projectCreatedMail(to: { name: string; email: string }, project: { code: string; title: string }, link: string): Mail {
  const body = `Hi ${firstName(to.name)}, a new project has been set up for you at CORE EV: ${project.title} (${project.code}). You can follow its progress and share files in the user portal.`;
  return {
    to: to.email,
    subject: `New CORE EV project: ${project.code}`,
    text: `${body}\n\n${link}`,
    html: layout({ heading: 'Your project is set up.', body: esc(body), cta: { label: 'View project', url: link } }),
  };
}

export function facilityMessageMail(msg: { name: string; email: string; institution: string; subject: string; body: string; project?: string; source: 'public' | 'portal' }, inbox: string): Mail {
  const lines = [
    `From: ${msg.name} <${msg.email}>`,
    ...(msg.institution ? [`Institution: ${msg.institution}`] : []),
    ...(msg.project ? [`Project: ${msg.project}`] : []),
    `Via: ${msg.source === 'portal' ? 'User portal' : 'Website contact form'}`,
    '',
    msg.body,
  ];
  return {
    to: inbox,
    replyTo: msg.email,
    subject: `[CORE EV] ${msg.subject}${msg.project ? ` — ${msg.project}` : ''}`,
    text: lines.join('\n'),
    html: `<pre style="font-family:-apple-system,system-ui,sans-serif;font-size:14px;white-space:pre-wrap">${esc(lines.join('\n'))}</pre>`,
  };
}
