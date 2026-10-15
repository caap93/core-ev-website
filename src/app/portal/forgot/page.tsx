import type { Metadata } from 'next';
import Link from 'next/link';
import { ForgotForm } from '../AuthForms';

export const metadata: Metadata = { title: 'Reset password' };

export default function ForgotPage() {
  return (
    <div className="auth-wrap">
      <div className="auth-inner">
        <div className="auth-head">
          <h1 className="auth-title">Reset password</h1>
          <p className="auth-sub">Enter your email and we&apos;ll send a reset link.</p>
        </div>
        <div className="auth-card"><ForgotForm /></div>
        <p className="center" style={{ marginTop: 20 }}>
          <Link href="/portal" className="link-btn">← Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
