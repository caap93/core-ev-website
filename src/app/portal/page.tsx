import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { LoginForm } from './AuthForms';

export const metadata: Metadata = { title: 'User portal' };

export default async function PortalLoginPage() {
  const user = await getCurrentUser();
  if (user) redirect(user.role === 'admin' ? '/portal/admin' : '/portal/dashboard');

  return (
    <div className="auth-wrap">
      <div className="auth-inner">
        <div className="auth-head">
          <img src="/images/core-ev-icon.png" alt="CORE EV" style={{ height: 40, width: 'auto', margin: '0 auto 16px' }} />
          <h1 className="auth-title">User portal</h1>
          <p className="auth-sub">Log in to track projects and access results.</p>
        </div>
        <div className="auth-card">
          <LoginForm />
          <div className="auth-foot">
            <p style={{ marginBottom: 10 }}>Don&apos;t have an account?</p>
            <Link href="/contact" className="link-btn">Contact us to register →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
