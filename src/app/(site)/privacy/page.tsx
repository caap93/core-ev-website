import type { Metadata } from 'next';
import { Eyebrow } from '@/components/Button';
import { CONTACT } from '@/lib/content';

export const metadata: Metadata = { title: 'Privacy notice' };

// Standard GDPR privacy notice. Review the retention periods and hosting details before launch.
const LAST_UPDATED = '16 October 2026';

const SECTIONS: { h: string; body: React.ReactNode }[] = [
  {
    h: 'Who we are',
    body: <p>This website and its user portal are operated by CORE Extracellular Vesicles (CORE EV), a core facility of Ghent University (Corneel Heymanslaan 10, 9000 Ghent, Belgium). For any question about your personal data, contact us at <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</p>,
  },
  {
    h: 'What data we collect',
    body: (
      <ul>
        <li><strong>Contact form:</strong> your name, email address, institution and the content of your message.</li>
        <li><strong>User portal accounts:</strong> your name, email address and institution, as provided when the facility invites you. Your password is stored only in encrypted (hashed) form; we cannot read it.</li>
        <li><strong>Project information:</strong> project details, progress, files you or the facility upload, and messages you send through the portal.</li>
        <li><strong>Technical data:</strong> the server keeps standard logs (such as IP address and time of access) for security and troubleshooting.</li>
      </ul>
    ),
  },
  {
    h: 'Why we use it',
    body: (
      <ul>
        <li>To answer your questions and requests (our legitimate interest, or steps you ask us to take before starting a project).</li>
        <li>To carry out the services you requested from the facility, share results and keep you informed of your project&apos;s progress (performance of our agreement with you).</li>
        <li>To keep the website and portal secure (our legitimate interest).</li>
      </ul>
    ),
  },
  {
    h: 'Cookies',
    body: <p>We do not use analytics, advertising or tracking cookies. When you sign in to the user portal, a single strictly necessary cookie keeps you signed in. It is deleted when you sign out or after 14 days. Because this cookie is essential for the portal to work, no consent is required.</p>,
  },
  {
    h: 'Who we share it with',
    body: <p>We do not sell or share your personal data with third parties for their own purposes. The website is hosted by our hosting provider in Belgium, which processes data on our behalf and under our instructions. Emails sent by the website (such as invitations and password resets) pass through our email provider.</p>,
  },
  {
    h: 'How long we keep it',
    body: (
      <ul>
        <li>Contact form messages: up to 2 years after our last exchange.</li>
        <li>Portal accounts: as long as you have access to the portal. You can ask us to close your account at any time.</li>
        <li>Project data and files: for as long as needed to complete the project and meet our scientific and administrative record-keeping obligations, after which they are deleted.</li>
      </ul>
    ),
  },
  {
    h: 'Your rights',
    body: <p>You have the right to access, correct or delete your personal data, to restrict or object to its processing, and to receive a copy of your data. To exercise these rights, email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. If you believe your data is not handled correctly, you can lodge a complaint with the Belgian Data Protection Authority (<a href="https://www.dataprotectionauthority.be" target="_blank" rel="noopener noreferrer">www.dataprotectionauthority.be</a>).</p>,
  },
];

export default function PrivacyPage() {
  return (
    <section className="tile s-light">
      <div className="container prose" style={{ maxWidth: 760 }}>
        <Eyebrow text="Privacy" />
        <h1 className="display h-page" style={{ margin: '0 0 16px' }}>Privacy notice.</h1>
        <p className="lead" style={{ marginBottom: 48 }}>How CORE EV handles your personal data. Last updated {LAST_UPDATED}.</p>
        {SECTIONS.map((s) => (
          <div key={s.h} style={{ marginBottom: 36 }}>
            <h2 className="display" style={{ fontSize: 24, letterSpacing: -0.3, margin: '0 0 12px' }}>{s.h}</h2>
            <div className="body">{s.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
