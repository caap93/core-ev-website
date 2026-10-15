import type { Metadata } from 'next';
import { ServicesAccordion } from '@/components/Accordion';
import { ButtonLink, Eyebrow } from '@/components/Button';
import { SERVICES } from '@/lib/content';

export const metadata: Metadata = { title: 'Services' };

export default function ServicesPage() {
  return (
    <>
      <section className="tile s-dark center">
        <div className="container" style={{ maxWidth: 820 }}>
          <Eyebrow text="Our Services" dark />
          <h1 className="display h-page-lg" style={{ color: 'var(--on-dark)', margin: '0 0 22px' }}>Expertise across the full EV workflow.</h1>
          <p className="lead on-dark-muted">
            Complete EV analysis services or targeted support for specific steps. Tailored to your sample type and scientific question.
          </p>
        </div>
      </section>

      <section className="tile s-light">
        <div className="container" style={{ maxWidth: 1060 }}>
          <ServicesAccordion items={SERVICES} />
        </div>
      </section>

      <section className="tile s-parchment center">
        <div className="container" style={{ maxWidth: 560 }}>
          <h2 className="display h-sub" style={{ margin: '0 0 14px' }}>Not sure what you need?</h2>
          <p className="body muted" style={{ lineHeight: 1.6, marginBottom: 28 }}>
            Our team is happy to help you design the optimal workflow for your sample type and scientific question.
          </p>
          <ButtonLink href="/contact">Request a consultation</ButtonLink>
        </div>
      </section>
    </>
  );
}
