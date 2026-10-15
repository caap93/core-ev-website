import type { Metadata } from 'next';
import { ButtonLink, Eyebrow } from '@/components/Button';
import { EQUIPMENT } from '@/lib/content';

export const metadata: Metadata = { title: 'Equipment' };

export default function EquipmentPage() {
  return (
    <>
      <section className="tile s-light">
        <div className="container" style={{ maxWidth: 1100 }}>
          <div className="center" style={{ marginBottom: 64 }}>
            <Eyebrow text="Equipment" />
            <h1 className="display h-page" style={{ margin: '0 0 16px' }}>State-of-the-art instrumentation.</h1>
            <p className="lead" style={{ maxWidth: 560, margin: '0 auto' }}>
              Our suite covers every step — from EV isolation through single-particle immunophenotyping.
            </p>
          </div>
          <div className="grid-2">
            {EQUIPMENT.map((eq) => (
              <div key={eq.name} className="card equip-full">
                <div>
                  <div className="tag">{eq.tag}</div>
                  <h2 className="equip-name">{eq.name}</h2>
                  <div className="equip-sub">{eq.mfr}</div>
                </div>
                <p>{eq.d}</p>
                <div className="chips">
                  {eq.specs.map((sp) => <span key={sp} className="chip">{sp}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="tile s-dark center">
        <div className="container" style={{ maxWidth: 560 }}>
          <h2 className="display h-sub" style={{ color: 'var(--on-dark)', margin: '0 0 16px' }}>Schedule instrument time.</h2>
          <p className="body on-dark-muted" style={{ lineHeight: 1.6, marginBottom: 32 }}>
            Contact us to discuss your sample needs and schedule an analysis session with our team.
          </p>
          <div className="btn-row">
            <ButtonLink href="/contact">Contact us</ButtonLink>
            <ButtonLink href="/portal" variant="ghost" onDark>Submit a sample</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
