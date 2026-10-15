/* CORE EV — User Portal (Login + Dashboard) */

const DEMO_USER = { email: 'researcher@university.edu', password: 'demo123', name: 'Dr. Anna Martinez' };
const ADMIN_USER = { email: 'evcore@ugent.be', password: 'coreadmin2025', name: 'Dr. Cláudio Pinheiro', isAdmin: true };

/* ── ACCOUNT STORE (localStorage-backed, simulates a real user directory) ── */
const USERS_KEY = 'core_ev_users';

function loadUsers() {
  try {
    const stored = JSON.parse(localStorage.getItem(USERS_KEY));
    if (stored && Array.isArray(stored)) return stored;
  } catch {}
  const seeded = [
    { name: 'Dr. Anna Martinez', email: 'researcher@university.edu', institution: 'University Hospital Brussels', password: 'demo123', status: 'active', joined: '2024-11-03' },
    { name: 'Dr. L. Vermeersch', email: 'l.vermeersch@vib.be', institution: 'VIB – Brain & Disease Research', password: 'welcome123', status: 'active', joined: '2025-02-14' },
    { name: 'Dr. M. Callens', email: 'm.callens@ugent.be', institution: 'UGent – Dept. of Urology', password: 'welcome123', status: 'active', joined: '2025-04-08' },
  ];
  localStorage.setItem(USERS_KEY, JSON.stringify(seeded));
  return seeded;
}

function saveUsers(users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }
function genToken() { return Math.random().toString(36).slice(2, 10) + Date.now().toString(36); }
function getInviteLink(token) { return `${window.location.origin}${window.location.pathname}#invite=${token}`; }
function getResetLink(token) { return `${window.location.origin}${window.location.pathname}#reset=${token}`; }

const DEMO_PROJECTS = [
{
  id: 'PRJ-2025-047',
  title: 'Plasma EV characterisation — Pancreatic cancer cohort',
  status: 'In Progress',
  statusColor: '#0066cc',
  created: '2025-05-15',
  steps: [
  { label: 'Sample received & logged', done: true, date: '2025-05-15' },
  { label: 'EV isolation via SEC', done: true, date: '2025-05-18' },
  { label: 'NTA analysis (ZetaView)', done: true, date: '2025-05-22' },
  { label: 'SP-IRIS / ExoView profiling', done: false, date: 'In progress' },
  { label: 'Data analysis & QC', done: false, date: 'Pending' },
  { label: 'Final report delivered', done: false, date: 'Pending' }],

  files: [
  { name: 'Sample_intake_form.pdf', size: '84 KB', date: '2025-05-15' },
  { name: 'Isolation_protocol_SEC.pdf', size: '212 KB', date: '2025-05-18' },
  { name: 'NTA_preliminary_results.pdf', size: '1.4 MB', date: '2025-05-23' }]

},
{
  id: 'PRJ-2025-021',
  title: 'Urine EV isolation optimisation — Diabetic nephropathy',
  status: 'Completed',
  statusColor: '#1a7a44',
  created: '2025-03-10',
  steps: [
  { label: 'Sample received & logged', done: true, date: '2025-03-10' },
  { label: 'EV isolation via ultracentrifugation', done: true, date: '2025-03-13' },
  { label: 'NTA analysis (ZetaView)', done: true, date: '2025-03-16' },
  { label: 'MRPS analysis (nCS1)', done: true, date: '2025-03-18' },
  { label: 'Data analysis & QC', done: true, date: '2025-03-22' },
  { label: 'Final report delivered', done: true, date: '2025-03-25' }],

  files: [
  { name: 'Final_Report_PRJ-2025-021.pdf', size: '3.2 MB', date: '2025-03-25' },
  { name: 'NTA_raw_data.csv', size: '540 KB', date: '2025-03-16' },
  { name: 'MRPS_raw_data.csv', size: '310 KB', date: '2025-03-18' },
  { name: 'Analysis_figures.zip', size: '8.6 MB', date: '2025-03-22' }]

}];


const ALL_PROJECTS = [
  { id: 'PRJ-2025-047', owner: 'Dr. Anna Martinez', ownerEmail: 'researcher@university.edu', title: 'Plasma EV characterisation — Pancreatic cancer cohort', status: 'In Progress', statusColor: '#0066cc', created: '2025-05-15', steps: [{ label: 'Sample received & logged', done: true, date: '2025-05-15' }, { label: 'EV isolation via SEC (Ascent)', done: true, date: '2025-05-18' }, { label: 'NTA analysis (Nanosight LM10)', done: true, date: '2025-05-22' }, { label: 'AF4-MALS fractionation', done: false, date: 'In progress' }, { label: 'Data analysis & QC', done: false, date: 'Pending' }, { label: 'Final report delivered', done: false, date: 'Pending' }], files: [{ name: 'Sample_intake_form.pdf', size: '84 KB', date: '2025-05-15' }, { name: 'Isolation_protocol_SEC.pdf', size: '212 KB', date: '2025-05-18' }, { name: 'NTA_preliminary_results.pdf', size: '1.4 MB', date: '2025-05-23' }] },
  { id: 'PRJ-2025-021', owner: 'Dr. Anna Martinez', ownerEmail: 'researcher@university.edu', title: 'Urine EV isolation optimisation — Diabetic nephropathy', status: 'Completed', statusColor: '#1a7a44', created: '2025-03-10', steps: [{ label: 'Sample received & logged', done: true, date: '2025-03-10' }, { label: 'EV isolation via ultracentrifugation', done: true, date: '2025-03-13' }, { label: 'NTA analysis (Nanosight LM10)', done: true, date: '2025-03-16' }, { label: 'AF4-MALS analysis', done: true, date: '2025-03-18' }, { label: 'Data analysis & QC', done: true, date: '2025-03-22' }, { label: 'Final report delivered', done: true, date: '2025-03-25' }], files: [{ name: 'Final_Report_PRJ-2025-021.pdf', size: '3.2 MB', date: '2025-03-25' }, { name: 'NTA_raw_data.csv', size: '540 KB', date: '2025-03-16' }, { name: 'AF4_raw_data.csv', size: '310 KB', date: '2025-03-18' }, { name: 'Analysis_figures.zip', size: '8.6 MB', date: '2025-03-22' }] },
  { id: 'PRJ-2025-053', owner: 'Dr. L. Vermeersch', ownerEmail: 'l.vermeersch@vib.be', title: 'CSF EV isolation — ALS biomarker study', status: 'Awaiting sample', statusColor: '#8a6000', created: '2025-05-28', steps: [{ label: 'Sample received & logged', done: false, date: 'Awaiting' }, { label: 'EV isolation via SEC (Ascent)', done: false, date: 'Pending' }, { label: 'NTA analysis (Nanosight LM10)', done: false, date: 'Pending' }, { label: 'dSTORM imaging (Oxford NanoImager)', done: false, date: 'Pending' }, { label: 'Final report delivered', done: false, date: 'Pending' }], files: [] },
  { id: 'PRJ-2025-049', owner: 'Dr. M. Callens', ownerEmail: 'm.callens@ugent.be', title: 'Urine EV proteomics — Bladder cancer markers', status: 'In Progress', statusColor: '#0066cc', created: '2025-05-20', steps: [{ label: 'Sample received & logged', done: true, date: '2025-05-20' }, { label: 'EV isolation via density gradient (Biomek 4000)', done: true, date: '2025-05-23' }, { label: 'Biophysical characterisation (NTA + AF4)', done: false, date: 'In progress' }, { label: 'Proteomics sample prep', done: false, date: 'Pending' }, { label: 'Final report delivered', done: false, date: 'Pending' }], files: [{ name: 'Sample_intake_PRJ-2025-049.pdf', size: '76 KB', date: '2025-05-20' }] },
];

/* ── LOGIN SCREEN ── */
function LoginScreen({ onLogin, onNav }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [mode, setMode] = React.useState('login');
  const [forgotEmail, setForgotEmail] = React.useState('');
  const [forgotError, setForgotError] = React.useState('');
  const [forgotSent, setForgotSent] = React.useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
        onLogin({ email: ADMIN_USER.email, name: ADMIN_USER.name, isAdmin: true });
        return;
      }
      const users = loadUsers();
      const match = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
      if (match && match.status === 'pending') {
        setError('This account is pending activation. Check your email for a link to set your password.');
        setLoading(false);
        return;
      }
      if (match && match.status === 'active' && match.password === password) {
        onLogin({ email: match.email, name: match.name });
        return;
      }
      setError('Incorrect email or password.');
      setLoading(false);
    }, 700);
  }

  function handleForgotSubmit(e) {
    e.preventDefault();
    setForgotError('');
    const users = loadUsers();
    const trimmed = forgotEmail.trim().toLowerCase();
    const match = users.find(u => u.email.toLowerCase() === trimmed && u.status === 'active');
    if (!match) {
      setForgotError('No active account found for that email.');
      return;
    }
    const resetToken = genToken();
    saveUsers(users.map(u => u.email === match.email ? { ...u, resetToken } : u));
    setForgotSent({ email: match.email, resetToken });
  }

  const inp = { width: '100%', fontFamily: T.fontText, fontSize: 16, color: T.ink, background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 8, padding: '13px 16px', outline: 'none', letterSpacing: -0.374, transition: 'border-color 0.15s' };

  if (mode === 'forgot') {
    return (
      <div style={{ minHeight: 'calc(100vh - 44px)', background: T.parchment, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 30, letterSpacing: -0.5, color: T.ink, marginBottom: 8 }}>Reset password</div>
            <p style={{ fontFamily: T.fontText, fontSize: 16, color: T.ink48, margin: 0 }}>Enter your email and we'll send a reset link.</p>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 18, padding: '36px 32px', boxShadow: '0 2px 24px rgba(0,0,0,0.06)' }}>
            {!forgotSent ?
            <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink, display: 'block', marginBottom: 6 }}>Email address</label>
                <input style={inp} type="email" required value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} placeholder="your@email.edu" autoComplete="email" />
              </div>
              {forgotError && <div style={{ fontFamily: T.fontText, fontSize: 14, color: '#b0201a', background: '#fdf2f1', border: '1px solid #f5c6c2', borderRadius: 8, padding: '10px 14px' }}>{forgotError}</div>}
              <BtnPrimary type="submit" style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}>Send reset link</BtnPrimary>
            </form> :

            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: 9999, background: T.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Icon name="mail" size={20} color="#fff" />
              </div>
              <p style={{ fontFamily: T.fontText, fontSize: 15, color: T.ink, lineHeight: 1.5, margin: '0 0 20px' }}>If an account exists for <strong>{forgotSent.email}</strong>, a reset link has been sent.</p>
              <BtnPrimary onClick={() => { window.location.hash = `reset=${forgotSent.resetToken}`; }}>Open reset link (demo)</BtnPrimary>
              <p style={{ fontFamily: T.fontText, fontSize: 12, color: T.ink48, marginTop: 16 }}>Prototype note: this stands in for the emailed link.</p>
            </div>
            }
          </div>
          <p style={{ textAlign: 'center', marginTop: 20 }}>
            <button onClick={() => { setMode('login'); setForgotSent(null); setForgotError(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: T.fontText, fontSize: 14, color: T.blue }}>← Back to sign in</button>
          </p>
        </div>
      </div>);
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 44px)', background: T.parchment, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <img src="assets/core-ev-icon.png" alt="CORE EV" style={{ height: 40, width: 'auto', margin: '0 auto 16px', display: 'block' }} />
          <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 30, letterSpacing: -0.5, color: T.ink, marginBottom: 8 }}>User portal</div>
          <p style={{ fontFamily: T.fontText, fontSize: 16, color: T.ink48, margin: 0 }}>Log in to track projects and access results.</p>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 18, padding: '36px 32px', boxShadow: '0 2px 24px rgba(0,0,0,0.06)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink, display: 'block', marginBottom: 6 }}>Email address</label>
              <input style={inp} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.edu" autoComplete="email" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink, margin: 0 }}>Password</label>
                <button type="button" onClick={() => setMode('forgot')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: T.fontText, fontSize: 13, color: T.blue, padding: 0 }}>Forgot password?</button>
              </div>
              <input style={inp} type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" />
            </div>
            {error &&
            <div style={{ fontFamily: T.fontText, fontSize: 14, color: '#b0201a', background: '#fdf2f1', border: '1px solid #f5c6c2', borderRadius: 8, padding: '10px 14px' }}>{error}</div>
            }
            <BtnPrimary type="submit" style={{ width: '100%', justifyContent: 'center', marginTop: 6, opacity: loading ? 0.65 : 1, pointerEvents: loading ? 'none' : 'auto' }}>
              {loading ? 'Signing in…' : 'Sign in'}
            </BtnPrimary>
          </form>
          <div style={{ borderTop: `1px solid ${T.hairline}`, marginTop: 24, paddingTop: 20, textAlign: 'center' }}>
            <p style={{ fontFamily: T.fontText, fontSize: 14, color: T.ink48, margin: '0 0 10px' }}>Don't have an account?</p>
            <button onClick={() => onNav('contact')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: T.fontText, fontSize: 14, color: T.blue }}>
              Contact us to register →
            </button>
          </div>
        </div>
        <p style={{ textAlign: 'center', fontFamily: T.fontText, fontSize: 12, color: T.ink48, marginTop: 20, lineHeight: 1.6 }}>
          Demo credentials:<br />researcher@university.edu / demo123<br /><span style={{ color: T.blue }}>Admin: evcore@ugent.be / coreadmin2025</span>
        </p>
      </div>
    </div>);
}

/* ── RESET PASSWORD (reached via emailed reset link, existing accounts) ── */
function ResetPasswordScreen({ resetUser, onComplete, onCancel }) {
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const inp = { width: '100%', fontFamily: T.fontText, fontSize: 16, color: T.ink, background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 8, padding: '13px 16px', outline: 'none', letterSpacing: -0.374 };

  if (!resetUser) {
    return (
      <div style={{ minHeight: 'calc(100vh - 44px)', background: T.parchment, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: 420, textAlign: 'center' }}>
          <div style={{ width: 52, height: 52, borderRadius: 9999, background: '#fdf2f1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
            <Icon name="x" size={22} color="#b0201a" />
          </div>
          <h1 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 24, letterSpacing: -0.3, color: T.ink, margin: '0 0 8px' }}>This reset link is invalid or expired.</h1>
          <p style={{ fontFamily: T.fontText, fontSize: 15, color: T.ink48, margin: '0 0 24px' }}>Request a new reset link from the sign-in page.</p>
          <BtnPrimary onClick={onCancel}>Go to sign in</BtnPrimary>
        </div>
      </div>);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setLoading(true);
    setTimeout(() => {
      onComplete({ ...resetUser, password, resetToken: null });
    }, 600);
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 44px)', background: T.parchment, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 52, height: 52, borderRadius: 9999, background: T.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
            <Icon name="user" size={22} color="#fff" />
          </div>
          <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 26, letterSpacing: -0.5, color: T.ink, marginBottom: 8 }}>Reset your password.</div>
          <p style={{ fontFamily: T.fontText, fontSize: 16, color: T.ink48, margin: 0 }}>Choose a new password for your account.</p>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 18, padding: '36px 32px', boxShadow: '0 2px 24px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: T.parchment, borderRadius: 10, padding: '12px 14px', marginBottom: 22 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9999, background: T.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 13, color: '#fff', flexShrink: 0 }}>
              {resetUser.name.split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div style={{ fontFamily: T.fontText, fontWeight: 600, fontSize: 14, color: T.ink }}>{resetUser.name}</div>
              <div style={{ fontFamily: T.fontText, fontSize: 13, color: T.ink48 }}>{resetUser.email}</div>
            </div>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink, display: 'block', marginBottom: 6 }}>New password</label>
              <input style={inp} type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters" autoComplete="new-password" />
            </div>
            <div>
              <label style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink, display: 'block', marginBottom: 6 }}>Confirm password</label>
              <input style={inp} type="password" required value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••" autoComplete="new-password" />
            </div>
            {error && <div style={{ fontFamily: T.fontText, fontSize: 14, color: '#b0201a', background: '#fdf2f1', border: '1px solid #f5c6c2', borderRadius: 8, padding: '10px 14px' }}>{error}</div>}
            <BtnPrimary type="submit" style={{ width: '100%', justifyContent: 'center', marginTop: 6, opacity: loading ? 0.65 : 1, pointerEvents: loading ? 'none' : 'auto' }}>
              {loading ? 'Updating…' : 'Update password'}
            </BtnPrimary>
          </form>
        </div>
      </div>
    </div>);
}

/* ── SET PASSWORD (account-activation landing, reached via emailed invite link) ── */
function SetPasswordScreen({ pendingUser, onComplete, onCancel }) {
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const inp = { width: '100%', fontFamily: T.fontText, fontSize: 16, color: T.ink, background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 8, padding: '13px 16px', outline: 'none', letterSpacing: -0.374 };

  if (!pendingUser) {
    return (
      <div style={{ minHeight: 'calc(100vh - 44px)', background: T.parchment, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: 420, textAlign: 'center' }}>
          <div style={{ width: 52, height: 52, borderRadius: 9999, background: '#fdf2f1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
            <Icon name="x" size={22} color="#b0201a" />
          </div>
          <h1 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 24, letterSpacing: -0.3, color: T.ink, margin: '0 0 8px' }}>This invite link is invalid or expired.</h1>
          <p style={{ fontFamily: T.fontText, fontSize: 15, color: T.ink48, margin: '0 0 24px' }}>Ask your CORE EV contact to send a new invitation, or sign in if you've already activated your account.</p>
          <BtnPrimary onClick={onCancel}>Go to sign in</BtnPrimary>
        </div>
      </div>);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setLoading(true);
    setTimeout(() => {
      onComplete({ ...pendingUser, password, status: 'active' });
    }, 600);
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 44px)', background: T.parchment, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 52, height: 52, borderRadius: 9999, background: T.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
            <Icon name="user" size={22} color="#fff" />
          </div>
          <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 26, letterSpacing: -0.5, color: T.ink, marginBottom: 8 }}>Welcome to CORE EV.</div>
          <p style={{ fontFamily: T.fontText, fontSize: 16, color: T.ink48, margin: 0 }}>Set a password to activate your account.</p>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 18, padding: '36px 32px', boxShadow: '0 2px 24px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: T.parchment, borderRadius: 10, padding: '12px 14px', marginBottom: 22 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9999, background: T.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 13, color: '#fff', flexShrink: 0 }}>
              {pendingUser.name.split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div style={{ fontFamily: T.fontText, fontWeight: 600, fontSize: 14, color: T.ink }}>{pendingUser.name}</div>
              <div style={{ fontFamily: T.fontText, fontSize: 13, color: T.ink48 }}>{pendingUser.email}</div>
            </div>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink, display: 'block', marginBottom: 6 }}>New password</label>
              <input style={inp} type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters" autoComplete="new-password" />
            </div>
            <div>
              <label style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink, display: 'block', marginBottom: 6 }}>Confirm password</label>
              <input style={inp} type="password" required value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••" autoComplete="new-password" />
            </div>
            {error && <div style={{ fontFamily: T.fontText, fontSize: 14, color: '#b0201a', background: '#fdf2f1', border: '1px solid #f5c6c2', borderRadius: 8, padding: '10px 14px' }}>{error}</div>}
            <BtnPrimary type="submit" style={{ width: '100%', justifyContent: 'center', marginTop: 6, opacity: loading ? 0.65 : 1, pointerEvents: loading ? 'none' : 'auto' }}>
              {loading ? 'Activating…' : 'Activate account'}
            </BtnPrimary>
          </form>
        </div>
      </div>
    </div>);
}

/* ── SIDEBAR NAV ── */
function SidebarNav({ tab, setTab, setActiveProject, user, onLogout }) {
  const tabs = [
  { key: 'dashboard', label: 'Dashboard', icon: 'activity' },
  { key: 'projects', label: 'My projects', icon: 'folder' },
  { key: 'upload', label: 'Upload files', icon: 'upload' },
  { key: 'messages', label: 'Contact facility', icon: 'mail' }];

  const initials = user.name.split(' ').filter(Boolean).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <aside style={{ width: 232, background: '#fff', borderRight: `1px solid ${T.hairline}`, display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'sticky', top: 44, height: 'calc(100vh - 44px)', overflowY: 'auto' }}>
      <div style={{ padding: '22px 18px', borderBottom: `1px solid ${T.hairline}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 9999, background: T.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 14, color: '#fff', flexShrink: 0 }}>{initials}</div>
          <div>
            <div style={{ fontFamily: T.fontText, fontWeight: 600, fontSize: 13, color: T.ink, lineHeight: 1.3 }}>{user.name}</div>
            <div style={{ fontFamily: T.fontText, fontSize: 11, color: T.ink48, lineHeight: 1.3 }}>{user.email}</div>
          </div>
        </div>
      </div>
      <nav style={{ padding: '10px 8px', flex: 1 }}>
        {tabs.map((t) =>
        <button key={t.key} onClick={() => {setTab(t.key);setActiveProject(null);}} style={{
          width: '100%', background: tab === t.key ? T.parchment : 'none',
          border: 'none', cursor: 'pointer', borderRadius: 8,
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', marginBottom: 2,
          color: tab === t.key ? T.blue : T.ink80,
          fontFamily: T.fontText, fontSize: 14, fontWeight: tab === t.key ? 600 : 400,
          letterSpacing: -0.2, transition: 'all 0.15s'
        }}>
            <Icon name={t.icon} size={15} color={tab === t.key ? T.blue : T.ink48} />
            {t.label}
          </button>
        )}
      </nav>
      <div style={{ padding: '12px 8px', borderTop: `1px solid ${T.hairline}` }}>
        <button onClick={onLogout} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', color: T.ink48, fontFamily: T.fontText, fontSize: 14, borderRadius: 8 }}>
          <Icon name="logout" size={15} color={T.ink48} />
          Sign out
        </button>
      </div>
    </aside>);

}

/* ── PROJECT CARD ── */
function ProjectCard({ p, onClick }) {
  const [hov, setHov] = React.useState(false);
  const pct = Math.round(p.steps.filter((s) => s.done).length / p.steps.length * 100);
  return (
    <div onClick={onClick}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    style={{ background: '#fff', border: `1px solid ${hov ? T.blue : T.hairline}`, borderRadius: 14, padding: '24px', cursor: 'pointer', transition: 'border-color 0.15s' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 18 }}>
        <div>
          <div style={{ fontFamily: T.fontText, fontWeight: 600, fontSize: 15, color: T.ink, marginBottom: 4 }}>{p.title}</div>
          <div style={{ fontFamily: T.fontText, fontSize: 12, color: T.ink48 }}>{p.id} · Started {p.created}</div>
        </div>
        <span style={{ fontFamily: T.fontText, fontSize: 12, fontWeight: 600, color: p.statusColor, background: `${p.statusColor}18`, borderRadius: 9999, padding: '4px 12px', flexShrink: 0 }}>{p.status}</span>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontFamily: T.fontText, fontSize: 12, color: T.ink48 }}>Progress</span>
          <span style={{ fontFamily: T.fontText, fontSize: 12, fontWeight: 600, color: T.ink }}>{pct}%</span>
        </div>
        <div style={{ background: T.hairline, borderRadius: 9999, height: 5, overflow: 'hidden' }}>
          <div style={{ background: p.statusColor, height: '100%', borderRadius: 9999, width: `${pct}%`, transition: 'width 0.6s ease' }} />
        </div>
      </div>
    </div>);

}

/* ── PROJECT DETAIL ── */
function ProjectDetail({ p, onBack, onAddFiles, onContact }) {
  function handleProjectFileInput(e) {
    const files = Array.from(e.target.files).map((f) => ({ name: f.name, size: `${(f.size / 1024).toFixed(0)} KB`, date: new Date().toISOString().split('T')[0] }));
    if (files.length) onAddFiles(files);
    e.target.value = '';
  }
  return (
    <div>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: T.fontText, fontSize: 14, color: T.blue, marginBottom: 28, padding: 0 }}>
        ← Back to projects
      </button>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 26, letterSpacing: -0.3, color: T.ink, margin: '0 0 6px' }}>{p.title}</h1>
          <div style={{ fontFamily: T.fontText, fontSize: 13, color: T.ink48 }}>{p.id} · Started {p.created}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <span style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: p.statusColor, background: `${p.statusColor}18`, borderRadius: 9999, padding: '6px 14px' }}>{p.status}</span>
          <button onClick={() => onContact(p)} style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.blue, background: '#fff', border: `1px solid ${T.blue}`, borderRadius: 9999, padding: '6px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="mail" size={13} color={T.blue} /> Contact about this project
          </button>
        </div>
      </div>
      {/* Timeline */}
      <div style={{ background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 14, padding: '28px 32px', marginBottom: 20 }}>
        <h3 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 17, letterSpacing: -0.2, margin: '0 0 28px' }}>Project progress</h3>
        {p.steps.map((step, i) =>
        <div key={i} style={{ display: 'flex', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ width: 26, height: 26, borderRadius: 9999, background: step.done ? T.blue : '#fff', border: `2px solid ${step.done ? T.blue : T.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', zIndex: 1 }}>
                {step.done && <Icon name="check" size={12} color="#fff" />}
              </div>
              {i < p.steps.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 28, background: step.done ? T.blue : T.hairline, margin: '3px 0', transition: 'background 0.3s' }} />}
            </div>
            <div style={{ paddingBottom: i < p.steps.length - 1 ? 28 : 0, paddingTop: 3 }}>
              <div style={{ fontFamily: T.fontText, fontSize: 15, color: step.done ? T.ink : T.ink48, marginBottom: 2 }}>{step.label}</div>
              <div style={{ fontFamily: T.fontText, fontSize: 12, color: step.done ? T.blue : T.ink48 }}>{step.date}</div>
            </div>
          </div>
        )}
      </div>
      {/* Files */}
      <div style={{ background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 14, padding: '28px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 17, letterSpacing: -0.2, margin: 0 }}>Shared files</h3>
          <label htmlFor={`project-file-input-${p.id}`} style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: '#fff', background: T.blue, borderRadius: 9999, padding: '8px 16px', cursor: 'pointer' }}>Upload to this project</label>
          <input id={`project-file-input-${p.id}`} type="file" multiple style={{ display: 'none' }} onChange={handleProjectFileInput} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {p.files.map((f) =>
          <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: T.parchment, borderRadius: 8 }}>
              <Icon name="file" size={15} color={T.blue} />
              <span style={{ fontFamily: T.fontText, fontSize: 14, color: T.ink, flex: 1 }}>{f.name}</span>
              <span style={{ fontFamily: T.fontText, fontSize: 12, color: T.ink48 }}>{f.size}</span>
              <span style={{ fontFamily: T.fontText, fontSize: 12, color: T.ink48 }}>{f.date}</span>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: T.blue, fontFamily: T.fontText, fontSize: 13 }}>
                <Icon name="download" size={13} color={T.blue} /> Download
              </button>
            </div>
          )}
        </div>
      </div>
    </div>);

}

/* ── DASHBOARD ── */
function Dashboard({ user, projects: initialProjects, onLogout, onNav }) {
  const [tab, setTab] = React.useState('dashboard');
  const [activeProject, setActiveProject] = React.useState(null);
  const [projects, setProjects] = React.useState(initialProjects);
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const [dragging, setDragging] = React.useState(false);
  const [msgForm, setMsgForm] = React.useState({ subject: '', message: '', projectId: '' });
  const [msgSent, setMsgSent] = React.useState(false);

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files).map((f) => ({ name: f.name, size: `${(f.size / 1024).toFixed(0)} KB`, status: 'ready' }));
    setUploadedFiles((prev) => [...prev, ...files]);
  }

  function handleFileInput(e) {
    const files = Array.from(e.target.files).map((f) => ({ name: f.name, size: `${(f.size / 1024).toFixed(0)} KB`, status: 'ready' }));
    setUploadedFiles((prev) => [...prev, ...files]);
    e.target.value = '';
  }

  function doUpload() {
    setUploadedFiles((prev) => prev.map((f) => f.status === 'ready' ? { ...f, status: 'uploaded' } : f));
  }

  function addFilesToProject(projId, newFiles) {
    const updater = p => ({ ...p, files: [...p.files, ...newFiles] });
    setProjects(ps => ps.map(p => p.id === projId ? updater(p) : p));
    setActiveProject(ap => ap && ap.id === projId ? updater(ap) : ap);
  }

  const activeProjects = projects.filter((p) => p.status === 'In Progress').length;
  const completedProjects = projects.filter((p) => p.status === 'Completed').length;

  return (
    <div style={{ minHeight: 'calc(100vh - 44px)', background: T.parchment, display: 'flex' }}>
      <SidebarNav tab={tab} setTab={setTab} setActiveProject={setActiveProject} user={user} onLogout={onLogout} />
      <main style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>

        {/* ── DASHBOARD TAB ── */}
        {tab === 'dashboard' && !activeProject &&
        <div>
            <h1 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 30, letterSpacing: -0.5, color: T.ink, margin: '0 0 6px' }} data-comment-anchor="8eaa25c2ed-h1-275-13">Welcome back, {user.name.split(' ').slice(-1)[0]}.</h1>
            <p style={{ fontFamily: T.fontText, fontSize: 16, color: T.ink48, margin: '0 0 36px' }}>Here's a summary of your active work at CORE EV.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 36 }}>
              {[
            { label: 'Active projects', value: activeProjects, icon: 'folder', color: T.blue },
            { label: 'Completed', value: completedProjects, icon: 'check', color: '#1a7a44' },
            { label: 'Files available', value: projects.reduce((a, p) => a + p.files.length, 0), icon: 'file', color: T.ink48 }].
            map((c) =>
            <div key={c.label} style={{ background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 14, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 9999, background: T.parchment, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={c.icon} size={17} color={c.color} />
                  </div>
                  <div>
                    <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 28, color: T.ink, lineHeight: 1 }}>{c.value}</div>
                    <div style={{ fontFamily: T.fontText, fontSize: 13, color: T.ink48, marginTop: 2 }}>{c.label}</div>
                  </div>
                </div>
            )}
            </div>
            <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 20, letterSpacing: -0.3, color: T.ink, margin: '0 0 16px' }}>Your projects</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {projects.map((p) =>
            <ProjectCard key={p.id} p={p} onClick={() => {setTab('projects');setActiveProject(p);}} />
            )}
            </div>
          </div>
        }

        {/* ── PROJECTS TAB ── */}
        {tab === 'projects' && !activeProject &&
        <div>
            <h1 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 30, letterSpacing: -0.5, color: T.ink, margin: '0 0 6px' }}>My projects</h1>
            <p style={{ fontFamily: T.fontText, fontSize: 16, color: T.ink48, margin: '0 0 28px' }}>Click a project to view detailed progress and files.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {projects.map((p) =>
            <ProjectCard key={p.id} p={p} onClick={() => setActiveProject(p)} />
            )}
            </div>
          </div>
        }

        {/* ── PROJECT DETAIL ── */}
        {activeProject && <ProjectDetail p={activeProject} onBack={() => setActiveProject(null)} onAddFiles={(files) => addFilesToProject(activeProject.id, files)} onContact={(p) => {setMsgForm((m) => ({ ...m, projectId: p.id }));setActiveProject(null);setTab('messages');}} />}

        {/* ── UPLOAD TAB ── */}
        {tab === 'upload' &&
        <div>
            <h1 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 30, letterSpacing: -0.5, color: T.ink, margin: '0 0 6px' }}>Upload files</h1>
            <p style={{ fontFamily: T.fontText, fontSize: 16, color: T.ink48, margin: '0 0 28px' }}>Share sample intake forms, protocols, and data with our team.</p>
            <div
            onDragOver={(e) => {e.preventDefault();setDragging(true);}}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById('portal-file-input').click()}
            style={{ border: `2px dashed ${dragging ? T.blue : T.hairline}`, borderRadius: 16, background: dragging ? `${T.blue}08` : '#fff', padding: '56px 24px', textAlign: 'center', marginBottom: 20, transition: 'all 0.2s', cursor: 'pointer' }}>
              <div style={{ width: 52, height: 52, borderRadius: 9999, background: T.parchment, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Icon name="upload" size={22} color={T.blue} />
              </div>
              <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 20, color: T.ink, marginBottom: 6 }}>Drop files here</div>
              <div style={{ fontFamily: T.fontText, fontSize: 14, color: T.ink48, marginBottom: 10 }}>or click to browse your computer</div>
              <span style={{ fontFamily: T.fontText, fontSize: 12, color: T.ink48 }}>PDF, DOCX, CSV, XLSX, TIFF · max 50 MB per file</span>
              <input id="portal-file-input" type="file" multiple accept=".pdf,.docx,.csv,.xlsx,.tiff,.png,.jpg" style={{ display: 'none' }} onChange={handleFileInput} />
            </div>
            {uploadedFiles.length > 0 &&
          <div style={{ background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 14, overflow: 'hidden', marginBottom: 20 }}>
                {uploadedFiles.map((f, i) =>
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: i < uploadedFiles.length - 1 ? `1px solid ${T.hairline}` : 'none' }}>
                    <Icon name="file" size={15} color={f.status === 'uploaded' ? '#1a7a44' : T.blue} />
                    <span style={{ fontFamily: T.fontText, fontSize: 14, color: T.ink, flex: 1 }}>{f.name}</span>
                    <span style={{ fontFamily: T.fontText, fontSize: 12, color: T.ink48 }}>{f.size}</span>
                    {f.status === 'uploaded' &&
              <span style={{ fontFamily: T.fontText, fontSize: 12, fontWeight: 600, color: '#1a7a44' }}>Uploaded ✓</span>
              }
                    <button onClick={(e) => {e.stopPropagation();setUploadedFiles((prev) => prev.filter((_, j) => j !== i));}} title="Delete file" style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.ink48, display: 'flex' }}><Icon name="x" size={14} color="#b0201a" /></button>
                  </div>
            )}
              </div>
          }
            {uploadedFiles.some((f) => f.status === 'ready') &&
          <BtnPrimary onClick={doUpload}>
                Upload {uploadedFiles.filter((f) => f.status === 'ready').length} file{uploadedFiles.filter((f) => f.status === 'ready').length > 1 ? 's' : ''}
              </BtnPrimary>
          }
          </div>
        }

        {/* ── MESSAGES TAB ── */}
        {tab === 'messages' &&
        <div>
            <h1 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 30, letterSpacing: -0.5, color: T.ink, margin: '0 0 6px' }}>Contact the facility</h1>
            <p style={{ fontFamily: T.fontText, fontSize: 16, color: T.ink48, margin: '0 0 28px' }}>Send a message directly to our team. We typically respond within one business day.</p>
            {msgSent ?
          <div style={{ background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 18, padding: '60px 40px', textAlign: 'center', maxWidth: 560 }}>
                <div style={{ width: 52, height: 52, borderRadius: 9999, background: T.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <Icon name="check" size={24} color="#fff" />
                </div>
                <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 24, letterSpacing: -0.3, margin: '0 0 8px' }}>Message sent.</h2>
                <p style={{ fontFamily: T.fontText, fontSize: 16, color: T.ink48, margin: '0 0 24px' }}>We'll respond to {user.email} shortly.</p>
                <BtnPrimary onClick={() => {setMsgSent(false);setMsgForm({ subject: '', message: '', projectId: '' });}}>Send another</BtnPrimary>
              </div> :

          <div style={{ background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 18, padding: '36px 40px', maxWidth: 580 }}>
                <form onSubmit={(e) => {e.preventDefault();setMsgSent(true);}} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div>
                    <label style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink, display: 'block', marginBottom: 6 }}>Related project <span style={{ fontWeight: 400, color: T.ink48 }}>(optional)</span></label>
                    <select
                  style={{ width: '100%', fontFamily: T.fontText, fontSize: 16, color: T.ink, background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 8, padding: '13px 16px', outline: 'none', cursor: 'pointer' }}
                  value={msgForm.projectId} onChange={(e) => setMsgForm((m) => ({ ...m, projectId: e.target.value }))}>
                      <option value="">No specific project</option>
                      {projects.map((p) => <option key={p.id} value={p.id}>{p.id} — {p.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink, display: 'block', marginBottom: 6 }}>Subject</label>
                    <select
                  style={{ width: '100%', fontFamily: T.fontText, fontSize: 16, color: T.ink, background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 8, padding: '13px 16px', outline: 'none', cursor: 'pointer' }}
                  value={msgForm.subject} onChange={(e) => setMsgForm((m) => ({ ...m, subject: e.target.value }))} required>
                      <option value="">Select a topic…</option>
                      <option>Project status update</option>
                      <option>Results question</option>
                      <option>New project request</option>
                      <option>File upload issue</option>
                      <option>Invoice / billing</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink, display: 'block', marginBottom: 6 }}>Message</label>
                    <textarea
                  style={{ width: '100%', fontFamily: T.fontText, fontSize: 16, color: T.ink, background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 8, padding: '13px 16px', outline: 'none', minHeight: 160, resize: 'vertical', letterSpacing: -0.374 }}
                  required value={msgForm.message} onChange={(e) => setMsgForm((m) => ({ ...m, message: e.target.value }))} placeholder="How can we help?" />
                  </div>
                  <BtnPrimary type="submit" style={{ alignSelf: 'flex-start' }}>Send message</BtnPrimary>
                </form>
              </div>
          }
          </div>
        }
      </main>
    </div>);

}

/* ── ADMIN DASHBOARD ── */
function AddStepRow({ onAdd }) {
  const [value, setValue] = React.useState('');
  function submit() { onAdd(value); setValue(''); }
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 12px', marginTop: 4 }}>
      <Icon name="plus" size={14} color={T.ink48} />
      <input value={value} onChange={e => setValue(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') submit(); }}
        placeholder="Add a step…" style={{ flex: 1, fontFamily: T.fontText, fontSize: 14, color: T.ink, border: 'none', outline: 'none', background: 'none' }} />
      <button onClick={submit} disabled={!value.trim()} style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: value.trim() ? T.blue : T.ink48, background: 'none', border: 'none', cursor: value.trim() ? 'pointer' : 'default' }}>Add</button>
    </div>);

}

function AdminDashboard({ user, projects: initialProjects, onLogout, onNav }) {
  const [tab, setTab] = React.useState('overview');
  const [activeProject, setActiveProject] = React.useState(null);
  const [projects, setProjects] = React.useState(initialProjects);
  const [statusFilter, setStatusFilter] = React.useState('All');
  const [addForm, setAddForm] = React.useState({ owner: '', ownerEmail: '', title: '', type: 'EV Isolation & Characterisation' });
  const [addSent, setAddSent] = React.useState(false);

  const statusOptions = ['Awaiting sample', 'In Progress', 'On Hold', 'Completed'];
  const statusColors = { 'Awaiting sample': '#8a6000', 'In Progress': '#0066cc', 'On Hold': '#6e3ab0', 'Completed': '#1a7a44' };

  function updateStatus(id, newStatus) {
    setProjects(ps => ps.map(p => p.id === id ? { ...p, status: newStatus, statusColor: statusColors[newStatus] } : p));
    setActiveProject(ap => ap && ap.id === id ? { ...ap, status: newStatus, statusColor: statusColors[newStatus] } : ap);
  }

  function addFiles(projId, newFiles) {
    const updater = p => ({ ...p, files: [...p.files, ...newFiles] });
    setProjects(ps => ps.map(p => p.id === projId ? updater(p) : p));
    setActiveProject(ap => ap && ap.id === projId ? updater(ap) : ap);
  }

  function deleteFile(projId, fileName) {
    const updater = p => ({ ...p, files: p.files.filter(f => f.name !== fileName) });
    setProjects(ps => ps.map(p => p.id === projId ? updater(p) : p));
    setActiveProject(ap => ap && ap.id === projId ? updater(ap) : ap);
  }

  function handleAdminFileInput(e) {
    const files = Array.from(e.target.files).map(f => ({ name: f.name, size: `${(f.size / 1024).toFixed(0)} KB`, date: new Date().toISOString().split('T')[0] }));
    if (files.length) addFiles(activeProject.id, files);
    e.target.value = '';
  }

  function toggleStep(projId, stepIdx) {
    const updater = p => ({
      ...p,
      steps: p.steps.map((s, i) => i === stepIdx ? { ...s, done: !s.done, date: !s.done ? new Date().toISOString().split('T')[0] : 'Pending' } : s)
    });
    setProjects(ps => ps.map(p => p.id === projId ? updater(p) : p));
    setActiveProject(ap => ap && ap.id === projId ? updater(ap) : ap);
  }

  function addStep(projId, label) {
    if (!label.trim()) return;
    const updater = p => ({ ...p, steps: [...p.steps, { label: label.trim(), done: false, date: 'Pending' }] });
    setProjects(ps => ps.map(p => p.id === projId ? updater(p) : p));
    setActiveProject(ap => ap && ap.id === projId ? updater(ap) : ap);
  }

  function removeStep(projId, stepIdx) {
    const updater = p => ({ ...p, steps: p.steps.filter((s, i) => i !== stepIdx) });
    setProjects(ps => ps.map(p => p.id === projId ? updater(p) : p));
    setActiveProject(ap => ap && ap.id === projId ? updater(ap) : ap);
  }

  function addProject(e) {
    e.preventDefault();
    const newId = `PRJ-${new Date().getFullYear()}-${String(projects.length + 54).padStart(3, '0')}`;
    const defaultSteps = [
      { label: 'Sample received & logged', done: false, date: 'Awaiting' },
      { label: 'EV isolation', done: false, date: 'Pending' },
      { label: 'Biophysical characterisation', done: false, date: 'Pending' },
      { label: 'Biochemical characterisation', done: false, date: 'Pending' },
      { label: 'Data analysis & QC', done: false, date: 'Pending' },
      { label: 'Final report delivered', done: false, date: 'Pending' },
    ];
    setProjects(ps => [{ id: newId, owner: addForm.owner, ownerEmail: addForm.ownerEmail, title: addForm.title, status: 'Awaiting sample', statusColor: '#8a6000', created: new Date().toISOString().split('T')[0], steps: defaultSteps, files: [] }, ...ps]);
    setAddSent(true);
    setAddForm({ owner: '', ownerEmail: '', title: '', type: 'EV Isolation & Characterisation' });
  }

  const adminTabs = [
    { key: 'overview', label: 'Overview', icon: 'activity' },
    { key: 'projects', label: 'All projects', icon: 'folder' },
    { key: 'add', label: 'Add project', icon: 'plus' },
    { key: 'users', label: 'Users', icon: 'user' },
  ];

  const INSTRUMENTS = [
    { name: 'Nanosight LM10', status: 'Available', color: '#1a7a44' },
    { name: 'ZetaView Twin', status: 'Available', color: '#1a7a44' },
    { name: 'Oxford NanoImager', status: 'Booked', color: '#0066cc' },
    { name: 'AF4 Eclipse + MALS', status: 'Available', color: '#1a7a44' },
    { name: 'Optima XPN-80 #1', status: 'In use', color: '#8a6000' },
    { name: 'Optima XPN-80 #2', status: 'Available', color: '#1a7a44' },
    { name: 'Ascent', status: 'Available', color: '#1a7a44' },
    { name: 'Biomek 4000', status: 'Available', color: '#1a7a44' },
    { name: 'Avanti JXN-26', status: 'Available', color: '#1a7a44' },
  ];

  const adminInp = { width: '100%', fontFamily: T.fontText, fontSize: 15, color: T.ink, background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 8, padding: '11px 14px', outline: 'none' };

  const [users, setUsers] = React.useState(loadUsers);
  const [showInvite, setShowInvite] = React.useState(false);
  const [inviteForm, setInviteForm] = React.useState({ name: '', email: '', institution: '' });
  const [inviteError, setInviteError] = React.useState('');
  const [previewUser, setPreviewUser] = React.useState(null);
  const [copiedFor, setCopiedFor] = React.useState('');

  function sendInvite(e) {
    e.preventDefault();
    setInviteError('');
    if (users.some(u => u.email.toLowerCase() === inviteForm.email.trim().toLowerCase())) {
      setInviteError('An account with this email already exists.');
      return;
    }
    const newUser = { name: inviteForm.name, email: inviteForm.email.trim(), institution: inviteForm.institution, password: '', status: 'pending', token: genToken(), joined: new Date().toISOString().split('T')[0] };
    const next = [newUser, ...users];
    setUsers(next);
    saveUsers(next);
    setShowInvite(false);
    setInviteForm({ name: '', email: '', institution: '' });
    setPreviewUser(newUser);
  }

  function resendInvite(email) {
    const next = users.map(u => u.email === email ? { ...u, token: genToken() } : u);
    setUsers(next);
    saveUsers(next);
    setPreviewUser(next.find(u => u.email === email));
  }

  function revokeInvite(email) {
    const next = users.filter(u => u.email !== email);
    setUsers(next);
    saveUsers(next);
  }

  function removeUser(email) {
    if (!window.confirm('Remove this user? They will lose access to the portal immediately.')) return;
    const next = users.filter(u => u.email !== email);
    setUsers(next);
    saveUsers(next);
  }

  function copyLink(u) {
    const link = getInviteLink(u.token);
    if (navigator.clipboard) navigator.clipboard.writeText(link).catch(() => {});
    setCopiedFor(u.email);
    setTimeout(() => setCopiedFor(''), 1600);
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 44px)', background: T.parchment, display: 'flex' }}>
      <aside style={{ width: 232, background: '#fff', borderRight: `1px solid ${T.hairline}`, display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'sticky', top: 44, height: 'calc(100vh - 44px)', overflowY: 'auto' }}>
        <div style={{ padding: '22px 18px', borderBottom: `1px solid ${T.hairline}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 9999, background: T.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 14, color: '#fff', flexShrink: 0 }}>CP</div>
            <div>
              <div style={{ fontFamily: T.fontText, fontWeight: 600, fontSize: 13, color: T.ink }}>{user.name}</div>
              <div style={{ fontFamily: T.fontText, fontSize: 11, color: T.blue, fontWeight: 600, letterSpacing: 0.4 }}>ADMIN</div>
            </div>
          </div>
        </div>
        <nav style={{ padding: '10px 8px', flex: 1 }}>
          {adminTabs.map(t => (
            <button key={t.key} onClick={() => { setTab(t.key); setActiveProject(null); setAddSent(false); }}
              style={{ width: '100%', background: tab === t.key ? T.parchment : 'none', border: 'none', cursor: 'pointer', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', marginBottom: 2, color: tab === t.key ? T.blue : T.ink80, fontFamily: T.fontText, fontSize: 14, fontWeight: tab === t.key ? 600 : 400, letterSpacing: -0.2, transition: 'all 0.15s' }}>
              <Icon name={t.icon} size={15} color={tab === t.key ? T.blue : T.ink48} />
              {t.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '12px 8px', borderTop: `1px solid ${T.hairline}` }}>
          <button onClick={onLogout} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', color: T.ink48, fontFamily: T.fontText, fontSize: 14, borderRadius: 8 }}>
            <Icon name="logout" size={15} color={T.ink48} /> Sign out
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>

        {/* OVERVIEW */}
        {tab === 'overview' && (
          <div>
            <h1 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 28, letterSpacing: -0.5, color: T.ink, margin: '0 0 4px' }}>Admin dashboard</h1>
            <p style={{ fontFamily: T.fontText, fontSize: 15, color: T.ink48, margin: '0 0 32px' }}>Full control over all CORE EV projects and users.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 36 }}>
              {[
                { label: 'Total projects', value: projects.length, icon: 'folder', color: T.blue },
                { label: 'Active', value: projects.filter(p => p.status === 'In Progress').length, icon: 'activity', color: '#0066cc' },
                { label: 'Awaiting sample', value: projects.filter(p => p.status === 'Awaiting sample').length, icon: 'clock', color: '#8a6000' },
                { label: 'Completed', value: projects.filter(p => p.status === 'Completed').length, icon: 'check', color: '#1a7a44' },
              ].map(c => (
                <div key={c.label} style={{ background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 14, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9999, background: T.parchment, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={c.icon} size={14} color={c.color} />
                  </div>
                  <div>
                    <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 26, color: T.ink, lineHeight: 1 }}>{c.value}</div>
                    <div style={{ fontFamily: T.fontText, fontSize: 12, color: T.ink48, marginTop: 2 }}>{c.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 18, letterSpacing: -0.3, color: T.ink, margin: '0 0 14px' }}>Active &amp; pending projects</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
              {projects.filter(p => p.status !== 'Completed').map(p => (
                <div key={p.id} onClick={() => { setTab('projects'); setActiveProject(p); }} style={{ background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 12, padding: '16px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: T.fontText, fontWeight: 600, fontSize: 14, color: T.ink }}>{p.title}</div>
                    <div style={{ fontFamily: T.fontText, fontSize: 12, color: T.ink48, marginTop: 2 }}>{p.id} · {p.owner}</div>
                  </div>
                  <span style={{ fontFamily: T.fontText, fontSize: 12, fontWeight: 600, color: p.statusColor, background: `${p.statusColor}18`, borderRadius: 9999, padding: '4px 12px', flexShrink: 0 }}>{p.status}</span>
                </div>
              ))}
            </div>
            <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 18, letterSpacing: -0.3, color: T.ink, margin: '0 0 14px' }}>Instrument status</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {INSTRUMENTS.map(inst => (
                <div key={inst.name} style={{ background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ fontFamily: T.fontText, fontSize: 14, color: T.ink }}>{inst.name}</div>
                  <span style={{ fontFamily: T.fontText, fontSize: 12, fontWeight: 600, color: inst.color, background: `${inst.color}18`, borderRadius: 9999, padding: '3px 10px', flexShrink: 0 }}>{inst.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ALL PROJECTS */}
        {tab === 'projects' && !activeProject && (
          <div>
            <h1 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 28, letterSpacing: -0.5, color: T.ink, margin: '0 0 4px' }}>All projects</h1>
            <p style={{ fontFamily: T.fontText, fontSize: 15, color: T.ink48, margin: '0 0 20px' }}>Click a project to view details and manage progress.</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
              {['All', ...statusOptions].map(s => {
                const active = statusFilter === s;
                const color = s === 'All' ? T.ink : statusColors[s];
                const count = s === 'All' ? projects.length : projects.filter(p => p.status === s).length;
                return (
                  <button key={s} onClick={() => setStatusFilter(s)} style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: active ? '#fff' : color, background: active ? color : `${color}18`, border: 'none', borderRadius: 9999, padding: '7px 16px', cursor: 'pointer' }}>{s} · {count}</button>
                );
              })}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {projects.filter(p => statusFilter === 'All' || p.status === statusFilter).map(p => {
                const pct = Math.round(p.steps.filter(s => s.done).length / p.steps.length * 100);
                return (
                  <div key={p.id} onClick={() => setActiveProject(p)} style={{ background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 14, padding: '20px 24px', cursor: 'pointer', transition: 'border-color 0.15s' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 14 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: T.fontText, fontWeight: 600, fontSize: 15, color: T.ink, marginBottom: 4 }}>{p.title}</div>
                        <div style={{ fontFamily: T.fontText, fontSize: 12, color: T.ink48 }}>{p.id} · <strong style={{ color: T.ink80 }}>{p.owner}</strong> · {p.ownerEmail}</div>
                      </div>
                      <span style={{ fontFamily: T.fontText, fontSize: 12, fontWeight: 600, color: p.statusColor, background: `${p.statusColor}18`, borderRadius: 9999, padding: '4px 12px', flexShrink: 0 }}>{p.status}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontFamily: T.fontText, fontSize: 12, color: T.ink48 }}>Progress</span>
                      <span style={{ fontFamily: T.fontText, fontSize: 12, fontWeight: 600, color: T.ink }}>{pct}%</span>
                    </div>
                    <div style={{ background: T.hairline, borderRadius: 9999, height: 4, overflow: 'hidden' }}>
                      <div style={{ background: p.statusColor, height: '100%', borderRadius: 9999, width: `${pct}%`, transition: 'width 0.4s' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PROJECT DETAIL (ADMIN) */}
        {tab === 'projects' && activeProject && (
          <div>
            <button onClick={() => setActiveProject(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: T.fontText, fontSize: 14, color: T.blue, marginBottom: 24, padding: 0 }}>← Back to projects</button>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
              <div>
                <h1 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 24, letterSpacing: -0.3, color: T.ink, margin: '0 0 4px' }}>{activeProject.title}</h1>
                <div style={{ fontFamily: T.fontText, fontSize: 13, color: T.ink48 }}>{activeProject.id} · {activeProject.owner} · {activeProject.ownerEmail}</div>
              </div>
              <div style={{ flexShrink: 0 }}>
                <select value={activeProject.status}
                  onChange={e => { updateStatus(activeProject.id, e.target.value); setActiveProject(ap => ({ ...ap, status: e.target.value, statusColor: statusColors[e.target.value] })); }}
                  style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: activeProject.statusColor, background: `${activeProject.statusColor}18`, border: `1px solid ${activeProject.statusColor}55`, borderRadius: 9999, padding: '7px 16px', cursor: 'pointer', outline: 'none' }}>
                  {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div style={{ background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 14, padding: '28px 32px', marginBottom: 20 }}>
              <h3 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 16, margin: '0 0 20px' }}>Progress <span style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 400, color: T.ink48 }}>— click any step to toggle</span></h3>
              {activeProject.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '10px 12px', borderRadius: 8, marginBottom: 4, background: step.done ? '#edf7ed' : 'transparent', transition: 'background 0.15s' }}>
                  <div onClick={() => toggleStep(activeProject.id, i)} style={{ width: 22, height: 22, borderRadius: 9999, background: step.done ? '#1a7a44' : '#fff', border: `2px solid ${step.done ? '#1a7a44' : T.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
                    {step.done && <Icon name="check" size={11} color="#fff" />}
                  </div>
                  <span onClick={() => toggleStep(activeProject.id, i)} style={{ fontFamily: T.fontText, fontSize: 14, color: step.done ? '#1a7a44' : T.ink, flex: 1, fontWeight: step.done ? 600 : 400, cursor: 'pointer' }}>{step.label}</span>
                  <span style={{ fontFamily: T.fontText, fontSize: 12, color: T.ink48 }}>{step.date}</span>
                  <button onClick={() => removeStep(activeProject.id, i)} title="Remove step" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}><Icon name="x" size={13} color={T.ink48} /></button>
                </div>
              ))}
              <AddStepRow onAdd={(label) => addStep(activeProject.id, label)} />
            </div>
            <div style={{ background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 14, padding: '28px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h3 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 16, margin: 0 }}>Shared files</h3>
                <label htmlFor="admin-file-input" style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: '#fff', background: T.blue, borderRadius: 9999, padding: '8px 16px', cursor: 'pointer' }}>Upload file</label>
                <input id="admin-file-input" type="file" multiple style={{ display: 'none' }} onChange={handleAdminFileInput} />
              </div>
              {activeProject.files.length === 0 ?
                <p style={{ fontFamily: T.fontText, fontSize: 14, color: T.ink48, margin: 0 }}>No files yet.</p> :
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {activeProject.files.map(f => (
                    <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: T.parchment, borderRadius: 8 }}>
                      <Icon name="file" size={14} color={T.blue} />
                      <span style={{ fontFamily: T.fontText, fontSize: 14, color: T.ink, flex: 1 }}>{f.name}</span>
                      <span style={{ fontFamily: T.fontText, fontSize: 12, color: T.ink48 }}>{f.size}</span>
                      <span style={{ fontFamily: T.fontText, fontSize: 12, color: T.ink48 }}>{f.date}</span>
                      <button onClick={() => deleteFile(activeProject.id, f.name)} title="Delete file" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', color: T.ink48 }}><Icon name="x" size={14} color="#b0201a" /></button>
                    </div>
                  ))}
                </div>
              }
            </div>
          </div>
        )}

        {/* ADD PROJECT */}
        {tab === 'add' && (
          <div>
            <h1 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 28, letterSpacing: -0.5, color: T.ink, margin: '0 0 4px' }}>Add project</h1>
            <p style={{ fontFamily: T.fontText, fontSize: 15, color: T.ink48, margin: '0 0 28px' }}>Create a new project and assign it to a researcher.</p>
            {addSent ?
              <div style={{ background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 18, padding: '52px 40px', textAlign: 'center', maxWidth: 480 }}>
                <div style={{ width: 48, height: 48, borderRadius: 9999, background: '#1a7a44', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><Icon name="check" size={22} color="#fff" /></div>
                <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 24, letterSpacing: -0.3, margin: '0 0 8px' }}>Project created.</h2>
                <p style={{ fontFamily: T.fontText, fontSize: 15, color: T.ink48, margin: '0 0 20px' }}>Added to All projects. The researcher will be notified.</p>
                <BtnPrimary onClick={() => setAddSent(false)}>Add another</BtnPrimary>
              </div> :
              <form onSubmit={addProject} style={{ background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 18, padding: '36px 40px', maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink, display: 'block', marginBottom: 6 }}>Researcher name</label>
                  <input style={adminInp} required value={addForm.owner} onChange={e => setAddForm(f => ({ ...f, owner: e.target.value }))} placeholder="Dr. ..." />
                </div>
                <div>
                  <label style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink, display: 'block', marginBottom: 6 }}>Researcher email</label>
                  <input style={adminInp} type="email" required value={addForm.ownerEmail} onChange={e => setAddForm(f => ({ ...f, ownerEmail: e.target.value }))} placeholder="researcher@institution.edu" />
                </div>
                <div>
                  <label style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink, display: 'block', marginBottom: 6 }}>Project title</label>
                  <input style={adminInp} required value={addForm.title} onChange={e => setAddForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Plasma EV characterisation — Cancer cohort" />
                </div>
                <div>
                  <label style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink, display: 'block', marginBottom: 6 }}>Service type</label>
                  <select style={{ ...adminInp, cursor: 'pointer' }} value={addForm.type} onChange={e => setAddForm(f => ({ ...f, type: e.target.value }))}>
                    <option>EV Isolation &amp; Characterisation</option>
                    <option>Biophysical Characterisation only</option>
                    <option>Biochemical Characterisation only</option>
                    <option>Super-resolution Microscopy (dSTORM)</option>
                    <option>Training &amp; Education</option>
                    <option>Consultation</option>
                  </select>
                </div>
                <BtnPrimary type="submit" style={{ alignSelf: 'flex-start', marginTop: 6 }}>Create project</BtnPrimary>
              </form>
            }
          </div>
        )}

        {/* USERS */}
        {tab === 'users' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 24 }}>
              <div>
                <h1 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 28, letterSpacing: -0.5, color: T.ink, margin: '0 0 4px' }}>Users</h1>
                <p style={{ fontFamily: T.fontText, fontSize: 15, color: T.ink48, margin: 0 }}>Researchers with access to the portal.</p>
              </div>
              <BtnPrimary onClick={() => { setInviteError(''); setShowInvite(true); }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="plus" size={15} color="#fff" /> Invite researcher</span>
              </BtnPrimary>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {users.map(u => {
                const userProjects = projects.filter(p => p.ownerEmail === u.email).length;
                const pending = u.status === 'pending';
                return (
                  <div key={u.email} style={{ background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 14, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 18 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 9999, background: pending ? T.ink48 : T.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 15, color: '#fff', flexShrink: 0 }}>
                      {u.name.split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ fontFamily: T.fontText, fontWeight: 600, fontSize: 15, color: T.ink }}>{u.name}</div>
                        {pending &&
                        <span style={{ fontFamily: T.fontText, fontSize: 11, fontWeight: 600, color: '#8a6000', background: '#8a600018', borderRadius: 9999, padding: '2px 10px', letterSpacing: 0.2 }}>Invite pending</span>
                        }
                      </div>
                      <div style={{ fontFamily: T.fontText, fontSize: 13, color: T.ink48 }}>{u.email} · {u.institution}</div>
                    </div>
                    {pending ?
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                      <button onClick={() => copyLink(u)} title="Copy invite link" style={{ background: 'none', border: `1px solid ${T.hairline}`, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', fontFamily: T.fontText, fontSize: 13, color: T.ink80 }}>
                        <Icon name="copy" size={13} color={T.ink80} /> {copiedFor === u.email ? 'Copied' : 'Copy link'}
                      </button>
                      <button onClick={() => setPreviewUser(u)} title="Preview invite email" style={{ background: 'none', border: `1px solid ${T.hairline}`, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', fontFamily: T.fontText, fontSize: 13, color: T.ink80 }}>
                        <Icon name="mail" size={13} color={T.ink80} /> Preview
                      </button>
                      <button onClick={() => resendInvite(u.email)} title="Resend invite" style={{ background: 'none', border: `1px solid ${T.hairline}`, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', fontFamily: T.fontText, fontSize: 13, color: T.blue }}>
                        <Icon name="send" size={13} color={T.blue} /> Resend
                      </button>
                      <button onClick={() => revokeInvite(u.email)} title="Revoke invite" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: T.ink48, display: 'flex' }}>
                        <Icon name="x" size={14} color={T.ink48} />
                      </button>
                    </div> :

                    <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexShrink: 0 }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 22, color: T.ink, lineHeight: 1 }}>{userProjects}</div>
                        <div style={{ fontFamily: T.fontText, fontSize: 12, color: T.ink48 }}>project{userProjects !== 1 ? 's' : ''}</div>
                      </div>
                      <button onClick={() => removeUser(u.email)} title="Remove user" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: T.ink48, display: 'flex' }}>
                        <Icon name="x" size={14} color={T.ink48} />
                      </button>
                    </div>
                    }
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* INVITE MODAL */}
        {showInvite &&
        <div onClick={() => setShowInvite(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 18, padding: '32px 36px', maxWidth: 460, width: '100%' }}>
            <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 22, letterSpacing: -0.3, color: T.ink, margin: '0 0 4px' }}>Invite a researcher</h2>
            <p style={{ fontFamily: T.fontText, fontSize: 14, color: T.ink48, margin: '0 0 22px' }}>They'll get an email with a link to set their own password and access the portal.</p>
            <form onSubmit={sendInvite} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink, display: 'block', marginBottom: 6 }}>Name</label>
                <input style={adminInp} required value={inviteForm.name} onChange={e => setInviteForm(f => ({ ...f, name: e.target.value }))} placeholder="Dr. ..." />
              </div>
              <div>
                <label style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink, display: 'block', marginBottom: 6 }}>Email</label>
                <input style={adminInp} type="email" required value={inviteForm.email} onChange={e => setInviteForm(f => ({ ...f, email: e.target.value }))} placeholder="researcher@institution.edu" />
              </div>
              <div>
                <label style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink, display: 'block', marginBottom: 6 }}>Institution</label>
                <input style={adminInp} required value={inviteForm.institution} onChange={e => setInviteForm(f => ({ ...f, institution: e.target.value }))} placeholder="e.g. UGent – Dept. of Biology" />
              </div>
              {inviteError && <div style={{ fontFamily: T.fontText, fontSize: 14, color: '#b0201a', background: '#fdf2f1', border: '1px solid #f5c6c2', borderRadius: 8, padding: '10px 14px' }}>{inviteError}</div>}
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <BtnPrimary type="submit">Send invite</BtnPrimary>
                <button type="button" onClick={() => setShowInvite(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: T.fontText, fontSize: 15, color: T.ink48, padding: '11px 8px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
        }

        {/* INVITE EMAIL PREVIEW MODAL */}
        {previewUser &&
        <div onClick={() => setPreviewUser(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 18, maxWidth: 480, width: '100%', overflow: 'hidden' }}>
            <div style={{ padding: '18px 28px', borderBottom: `1px solid ${T.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink48, letterSpacing: 0.3, textTransform: 'uppercase' }}>Invitation sent</span>
              <button onClick={() => setPreviewUser(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: T.ink48 }}><Icon name="x" size={16} color={T.ink48} /></button>
            </div>
            <div style={{ padding: '24px 28px 28px' }}>
              <div style={{ fontFamily: T.fontText, fontSize: 13, color: T.ink48, marginBottom: 2 }}>To: {previewUser.email}</div>
              <div style={{ fontFamily: T.fontText, fontSize: 13, color: T.ink48, marginBottom: 18 }}>From: CORE Extracellular Vesicles &lt;no-reply@coreev.example&gt;</div>
              <div style={{ background: T.parchment, borderRadius: 14, padding: '32px 28px', textAlign: 'center' }}>
                <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 15, letterSpacing: -0.3, color: T.ink, marginBottom: 18 }}>CORE</div>
                <h3 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 20, letterSpacing: -0.3, color: T.ink, margin: '0 0 10px' }}>You've been invited to the CORE EV portal.</h3>
                <p style={{ fontFamily: T.fontText, fontSize: 15, color: T.ink48, lineHeight: 1.5, margin: '0 0 24px' }}>
                  Hi {previewUser.name.split(' ').slice(-1)[0]}, an account has been created for you to track your projects at CORE Extracellular Vesicles. Set a password to get started.
                </p>
                <BtnPrimary onClick={() => { setPreviewUser(null); onLogout(); window.location.hash = `invite=${previewUser.token}`; }}>Set your password</BtnPrimary>
                <p style={{ fontFamily: T.fontText, fontSize: 12, color: T.ink48, marginTop: 20 }}>This link expires in 7 days.</p>
              </div>
              <p style={{ fontFamily: T.fontText, fontSize: 12, color: T.ink48, marginTop: 16, textAlign: 'center' }}>
                Prototype note: this preview stands in for a real email. Clicking the button simulates the researcher opening their invite link.
              </p>
            </div>
          </div>
        </div>
        }

      </main>
    </div>
  );
}

/* ── PORTAL ROOT ── */
function readInviteToken() {
  const m = window.location.hash.match(/invite=([^&]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}
function readResetToken() {
  const m = window.location.hash.match(/reset=([^&]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

function PortalPage({ onNav }) {
  const [user, setUser] = React.useState(() => {
    try {return JSON.parse(localStorage.getItem('core_ev_user') || 'null');} catch {return null;}
  });
  const [inviteToken, setInviteToken] = React.useState(readInviteToken);
  const [resetToken, setResetToken] = React.useState(readResetToken);

  React.useEffect(() => {
    function onHashChange() { setInviteToken(readInviteToken()); setResetToken(readResetToken()); }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  function login(u) {setUser(u);localStorage.setItem('core_ev_user', JSON.stringify(u));}
  function logout() {setUser(null);localStorage.removeItem('core_ev_user');}

  function clearInvite() {
    window.location.hash = '';
    setInviteToken(null);
    setResetToken(null);
  }

  function completeInvite(activatedUser) {
    const users = loadUsers().map(u => u.email === activatedUser.email ? activatedUser : u);
    saveUsers(users);
    clearInvite();
    login({ email: activatedUser.email, name: activatedUser.name });
  }

  function completeReset(updatedUser) {
    const users = loadUsers().map(u => u.email === updatedUser.email ? updatedUser : u);
    saveUsers(users);
    clearInvite();
    login({ email: updatedUser.email, name: updatedUser.name });
  }

  if (inviteToken) {
    const pending = loadUsers().find(u => u.token === inviteToken && u.status === 'pending');
    return <SetPasswordScreen pendingUser={pending} onComplete={completeInvite} onCancel={clearInvite} />;
  }

  if (resetToken) {
    const target = loadUsers().find(u => u.resetToken === resetToken && u.status === 'active');
    return <ResetPasswordScreen resetUser={target} onComplete={completeReset} onCancel={clearInvite} />;
  }

  if (!user) return <LoginScreen onLogin={login} onNav={onNav} />;
  if (user.isAdmin) return <AdminDashboard user={user} projects={ALL_PROJECTS} onLogout={logout} onNav={onNav} />;
  return <Dashboard user={user} projects={DEMO_PROJECTS} onLogout={logout} onNav={onNav} />;
}

Object.assign(window, { PortalPage });