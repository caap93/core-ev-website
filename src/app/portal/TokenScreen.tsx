import { ButtonLink } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { findTokenUser } from '@/lib/auth';
import { initials } from '@/lib/projects';
import { NewPasswordForm } from './AuthForms';

const COPY = {
  invite: {
    title: 'Welcome to CORE EV.', sub: 'Set a password to activate your account.',
    invalid: 'This invite link is invalid or expired.',
    invalidSub: "Ask your CORE EV contact to send a new invitation, or sign in if you've already activated your account.",
  },
  reset: {
    title: 'Reset your password.', sub: 'Choose a new password for your account.',
    invalid: 'This reset link is invalid or expired.',
    invalidSub: 'Request a new reset link from the sign-in page.',
  },
};

/** Landing screen for emailed invite / reset links. */
export async function TokenScreen({ token, mode }: { token: string; mode: 'invite' | 'reset' }) {
  const user = await findTokenUser(token, mode);
  const c = COPY[mode];

  if (!user) {
    return (
      <div className="auth-wrap">
        <div className="auth-inner wide center">
          <div className="badge-circle" style={{ width: 52, height: 52, background: '#fdf2f1', margin: '0 auto 18px' }}><Icon name="x" size={22} color="var(--red)" /></div>
          <h1 className="display" style={{ fontSize: 24, letterSpacing: -0.3, margin: '0 0 8px' }}>{c.invalid}</h1>
          <p className="muted" style={{ fontSize: 15, margin: '0 0 24px' }}>{c.invalidSub}</p>
          <ButtonLink href="/portal">Go to sign in</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-wrap">
      <div className="auth-inner wide">
        <div className="auth-head" style={{ marginBottom: 32 }}>
          <div className="badge-circle" style={{ width: 52, height: 52, margin: '0 auto 18px' }}><Icon name="user" size={22} color="#fff" /></div>
          <h1 className="auth-title sm">{c.title}</h1>
          <p className="auth-sub">{c.sub}</p>
        </div>
        <div className="auth-card">
          <div className="who">
            <div className="avatar sm">{initials(user.name)}</div>
            <div>
              <div className="who-name">{user.name}</div>
              <div className="who-email">{user.email}</div>
            </div>
          </div>
          <NewPasswordForm token={token} mode={mode} />
          {mode === 'invite' && (
            <p className="form-note" style={{ marginTop: 16, textAlign: 'center' }}>
              By activating your account you acknowledge our <a href="/privacy" target="_blank">privacy notice</a>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
