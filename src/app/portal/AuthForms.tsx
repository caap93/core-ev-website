'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { activateAccount, login, requestPasswordReset, resetPassword, type AuthState } from '@/actions/auth';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';

function ErrorBox({ error }: { error?: string }) {
  return error ? <div className="alert-error" role="alert">{error}</div> : null;
}

export function LoginForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(login, {});
  return (
    <form action={action} className="form">
      <div>
        <label className="field-label" htmlFor="l-email">Email address</label>
        <input id="l-email" name="email" type="email" className="input" required defaultValue={state.email} placeholder="your@email.edu" autoComplete="email" />
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <label className="field-label" htmlFor="l-password" style={{ margin: 0 }}>Password</label>
          <Link href="/portal/forgot" className="link-btn" style={{ fontSize: 13 }}>Forgot password?</Link>
        </div>
        <input id="l-password" name="password" type="password" className="input" required placeholder="••••••••" autoComplete="current-password" />
      </div>
      <ErrorBox error={state.error} />
      <Button type="submit" disabled={pending} className="btn-block" style={{ marginTop: 6 }}>
        {pending ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  );
}

export function ForgotForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(requestPasswordReset, {});
  if (state.ok) {
    return (
      <div className="center" role="status">
        <div className="badge-circle" style={{ width: 48, height: 48, margin: '0 auto 16px' }}><Icon name="mail" size={20} color="#fff" /></div>
        <p style={{ fontSize: 15, lineHeight: 1.5 }}>
          If an account exists for <strong>{state.email}</strong>, a reset link has been sent. It expires in 1 hour.
        </p>
      </div>
    );
  }
  return (
    <form action={action} className="form">
      <div>
        <label className="field-label" htmlFor="f-email">Email address</label>
        <input id="f-email" name="email" type="email" className="input" required placeholder="your@email.edu" autoComplete="email" />
      </div>
      <ErrorBox error={state.error} />
      <Button type="submit" disabled={pending} className="btn-block" style={{ marginTop: 6 }}>
        {pending ? 'Sending…' : 'Send reset link'}
      </Button>
    </form>
  );
}

/** New-password form shared by invite activation and password reset. */
export function NewPasswordForm({ token, mode }: { token: string; mode: 'invite' | 'reset' }) {
  const fn = (mode === 'invite' ? activateAccount : resetPassword).bind(null, token);
  const [state, action, pending] = useActionState<AuthState, FormData>(fn, {});
  return (
    <form action={action} className="form">
      <div>
        <label className="field-label" htmlFor="np-password">New password</label>
        <input id="np-password" name="password" type="password" className="input" required minLength={8} placeholder="At least 8 characters" autoComplete="new-password" />
      </div>
      <div>
        <label className="field-label" htmlFor="np-confirm">Confirm password</label>
        <input id="np-confirm" name="confirm" type="password" className="input" required placeholder="••••••••" autoComplete="new-password" />
      </div>
      <ErrorBox error={state.error} />
      <Button type="submit" disabled={pending} className="btn-block" style={{ marginTop: 6 }}>
        {mode === 'invite' ? (pending ? 'Activating…' : 'Activate account') : (pending ? 'Updating…' : 'Update password')}
      </Button>
    </form>
  );
}
