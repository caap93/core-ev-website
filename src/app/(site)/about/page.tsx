import type { Metadata } from 'next';
import { ButtonLink, Eyebrow } from '@/components/Button';
import { EVPlaceholder } from '@/components/EVPlaceholder';

export const metadata: Metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <>
      <section className="tile s-light">
        <div className="container split" style={{ maxWidth: 1100 }}>
          <div>
            <Eyebrow text="About the facility" />
            <h1 className="display h-page" style={{ margin: '0 0 26px' }}>Built for EV science. Open to all researchers.</h1>
            <p className="body">
              The CORE EV empowers the research community with deep expertise, advanced tools, and innovative technologies for studying extracellular vesicles and non-vesicular extracellular particles (including liposomes, lipid nanoparticles (LNP) etc.)
            </p>
          </div>
          <div className="media"><EVPlaceholder height={420} /></div>
        </div>
      </section>

      <section className="tile s-parchment">
        <div className="container split-about" style={{ maxWidth: 1100 }}>
          <h2 className="display h-section">About us</h2>
          <div>
            <p className="body" style={{ marginBottom: 20 }}>
              The CORE EV provides comprehensive support, from preparation and isolation towards detailed characterisation and analysis in compliance with the field&apos;s minimal information guidelines, helping researchers generate faster, more accurate, and more reliable insights in this rapidly evolving field.
            </p>
            <p className="body" style={{ marginBottom: 20 }}>
              EV isolation relies on biophysical features — size and density. We offer differential ultracentrifugation, density gradient ultracentrifugation, and size exclusion chromatography, alone or in combination, for isolation from complex biological matrices.
            </p>
            <p className="body">
              Characterisation spans biophysical methods (NTA via Nanosight LM10 and ZetaView Twin, the latter adding direct zeta potential measurement; AF4 coupled to MALS, UV, and fluorescence via Wyatt Eclipse) and biochemical analyses (immunoblotting, ELISA, single-molecule dSTORM via Oxford NanoImager, and omics). We also provide training and education for individuals and lab groups, and study design consultation to ensure your EV work meets the highest standards for high-impact publication.
            </p>
          </div>
        </div>
      </section>

      <section className="tile s-dark center">
        <div className="container" style={{ maxWidth: 860 }}>
          <blockquote className="display" style={{ fontSize: 34, lineHeight: 1.3, letterSpacing: -0.374, color: 'var(--on-dark)', margin: '0 0 28px', textWrap: 'pretty' }}>
            &ldquo;Our goal is to make rigorous EV science accessible to every researcher — regardless of their prior experience with these methods.&rdquo;
          </blockquote>
          <p className="on-dark-muted" style={{ fontSize: 15 }}>— Prof. An Hendrix, Scientific Supervisor, CORE EV</p>
        </div>
      </section>

      <section className="tile s-light center">
        <div className="container" style={{ maxWidth: 560 }}>
          <h2 className="display h-sub" style={{ margin: '0 0 16px' }}>Work with our team.</h2>
          <p className="body muted" style={{ lineHeight: 1.6, marginBottom: 30 }}>
            Contact us to discuss your project, request a consultation, or submit a sample for analysis.
          </p>
          <div className="btn-row" style={{ marginTop: 32 }}>
            <ButtonLink href="/contact">Contact us</ButtonLink>
            <ButtonLink href="/team" variant="ghost">Meet the team</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
