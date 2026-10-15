import type { Metadata } from 'next';
import { ButtonLink, Eyebrow } from '@/components/Button';
import { STEERING, TEAM } from '@/lib/content';

export const metadata: Metadata = { title: 'Team' };

export default function TeamPage() {
  return (
    <>
      <section className="tile s-light">
        <div className="container" style={{ maxWidth: 1060 }}>
          <div className="center" style={{ marginBottom: 64 }}>
            <Eyebrow text="Our Team" />
            <h1 className="display h-page" style={{ margin: '0 0 16px' }}>Scientists committed to your research.</h1>
            <p className="lead" style={{ maxWidth: 520, margin: '0 auto' }}>Deep expertise in EV biology, instrumentation, and data analysis.</p>
          </div>
          <div className="grid-2">
            {TEAM.map((m) => (
              <div key={m.name} className="card team-card">
                <img src={m.photo} alt={m.name} className="team-photo" width={80} height={80} style={{ objectPosition: m.objectPosition }} />
                <div>
                  <h2 className="team-name">{m.name}</h2>
                  <div className="team-role">{m.role}</div>
                  <p className="team-bio">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="tile s-parchment">
        <div className="container" style={{ maxWidth: 1060 }}>
          <div style={{ marginBottom: 44 }}>
            <Eyebrow text="Steering Committee" />
            <h2 className="display h-sub" style={{ margin: '0 0 14px' }}>Scientific oversight across faculties.</h2>
            <p className="body muted" style={{ lineHeight: 1.6, maxWidth: 620 }}>
              Promotors from across Ghent University guide the facility&apos;s scientific strategy, ensuring CORE EV serves the breadth of EV research at UGent.
            </p>
          </div>
          <div className="steer-grid">
            {STEERING.map((m) => (
              <div key={m.name} className="steer-card">
                <div className="steer-name">{m.name}</div>
                <div className="steer-dept">{m.dept}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="tile s-light center">
        <div className="container" style={{ maxWidth: 460 }}>
          <h2 className="display h-sub" style={{ margin: '0 0 14px' }}>Get in touch.</h2>
          <p className="body muted" style={{ lineHeight: 1.6, marginBottom: 24 }}>Our scientists are happy to discuss your research questions and suggest the right approach.</p>
          <ButtonLink href="/contact">Contact us</ButtonLink>
        </div>
      </section>
    </>
  );
}
