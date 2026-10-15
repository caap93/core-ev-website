import { DarkAccordion } from '@/components/Accordion';
import { ButtonLink, Eyebrow } from '@/components/Button';
import { HOME_EQUIPMENT, HOME_SERVICES, STATS } from '@/lib/content';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="tile-hero s-dark center">
        <div className="container" style={{ maxWidth: 860 }}>
          <img src="/images/core-ev-icon-white.png" alt="CORE EV" className="hero-icon" />
          <Eyebrow text="Core Facility · Extracellular Vesicles" dark />
          <h1 className="display h-hero" style={{ color: 'var(--on-dark)' }}>The platform for extracellular vesicle science.</h1>
          <p className="hero-sub">
            Comprehensive isolation, characterisation, and analysis of EVs and nanoparticles — built for reproducibility and publication-ready results.
          </p>
          <div className="btn-row">
            <ButtonLink href="/services" size="lg">Explore services</ButtonLink>
            <ButtonLink href="/contact" variant="ghost" size="lg" onDark>Request consultation</ButtonLink>
          </div>
          <div className="media hero-media">
            <img src="/images/home-hero.webp" alt="Extracellular vesicle research at CORE EV" width={1200} height={707} fetchPriority="high" />
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="tile s-light">
        <div className="container split" style={{ maxWidth: 1100 }}>
          <div>
            <Eyebrow text="What we do" />
            <h2 className="display" style={{ fontSize: 'clamp(32px, 4vw, 42px)', lineHeight: 1.1, margin: '0 0 24px' }}>
              Isolation, characterisation, and analysis of EVs at scale.
            </h2>
            <p className="body" style={{ marginBottom: 16 }}>
              The CORE EV Facility provides comprehensive services for the isolation, quantification, and characterisation of extracellular vesicles and other nanoparticles — including liposomes, lipid nanoparticles (LNP), and viral particles (lentivirus).
            </p>
            <p className="body" style={{ marginBottom: 32 }}>
              We combine state-of-the-art instrumentation with deep methodological expertise so that every dataset is reproducible, rigorous, and ready for high-impact publication.
            </p>
            <ButtonLink href="/about">Learn about us</ButtonLink>
          </div>
          <div className="media feature-media">
            <img src="/images/home-lab-feature.webp" alt="The CORE EV facility" width={1012} height={672} loading="lazy" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="tile s-parchment">
        <div className="container" style={{ maxWidth: 1100 }}>
          <h2 className="display h-section center" style={{ marginBottom: 64 }}>The facility by the numbers.</h2>
          <div className="stats">
            {STATS.map((s) => (
              <div key={s.n} className="stat">
                <div className="stat-n">{s.n}</div>
                <div className="stat-l">{s.l}</div>
                <div className="stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services accordion */}
      <section className="tile s-dark">
        <div className="container split-svc" style={{ maxWidth: 1100 }}>
          <div>
            <Eyebrow text="Services" dark />
            <h2 className="display h-section" style={{ color: 'var(--on-dark)', margin: '0 0 20px' }}>Expert EV services, end to end.</h2>
            <p className="body on-dark-muted" style={{ marginBottom: 36 }}>
              From sample receipt to publication-ready data. Every workflow is tailored to your biological question.
            </p>
            <ButtonLink href="/services">View all services</ButtonLink>
          </div>
          <DarkAccordion items={HOME_SERVICES} />
        </div>
      </section>

      {/* Equipment */}
      <section className="tile s-light center">
        <div className="container" style={{ maxWidth: 1100 }}>
          <Eyebrow text="Equipment" />
          <h2 className="display h-section" style={{ margin: '0 0 14px' }}>State-of-the-art instrumentation.</h2>
          <p className="lead" style={{ margin: '0 auto 52px', maxWidth: 560 }}>
            Our suite covers every step — from EV isolation through single-particle immunophenotyping.
          </p>
          <div className="grid-3" style={{ textAlign: 'left' }}>
            {HOME_EQUIPMENT.map((eq) => (
              <div key={eq.name} className="card equip-card">
                <div className="tag">{eq.tag}</div>
                <div className="equip-name">{eq.name}</div>
                <div className="equip-sub">{eq.sub}</div>
                <div className="equip-desc">{eq.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <ButtonLink href="/equipment">View all equipment</ButtonLink>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tile-tall s-dark2 center">
        <div className="container" style={{ maxWidth: 680 }}>
          <h2 className="display h-cta" style={{ color: 'var(--on-dark)', margin: '0 0 20px' }}>Ready to start your EV project?</h2>
          <p className="lead on-dark-muted" style={{ marginBottom: 40 }}>
            Contact us to discuss your research needs. We will design a workflow tailored to your sample type and scientific question.
          </p>
          <div className="btn-row">
            <ButtonLink href="/contact" size="lg">Request a consultation</ButtonLink>
            <ButtonLink href="/portal" variant="ghost" size="lg" onDark>User portal</ButtonLink>
          </div>
        </div>
      </section>

      {/* UGent affiliation band */}
      <div className="affiliation">
        <div className="affiliation-inner">
          <span className="affiliation-text">CORE EV is a core facility within</span>
          <a href="https://www.ugent.be/en" target="_blank" rel="noopener noreferrer">
            <img src="/images/logos/ugent.webp" alt="Ghent University" width={220} height={176} />
          </a>
        </div>
      </div>
    </>
  );
}
