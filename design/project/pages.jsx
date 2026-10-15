/* CORE EV — All public pages */

/* ── EYEBROW helper ── */
function Eyebrow({ text, dark }) {
  return (
    <div style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: dark ? T.blueDark : T.blue, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 18 }}>{text}</div>);

}

/* ══════════════════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════════════════ */
function HomePage({ onNav, affiliation = {} }) {
  const [openSvc, setOpenSvc] = React.useState(0);

  const services = [
  { t: 'EV Isolation & Separation', d: 'Differential ultracentrifugation, density gradient ultracentrifugation, and size exclusion chromatography — alone or combined — to isolate EVs from any biological matrix.' },
  { t: 'Biophysical Characterisation', d: 'Particle size, concentration, and zeta potential via NTA (Nanosight LM10, ZetaView Twin), and high-resolution fractionation and sizing via AF4 coupled to MALS, UV, and fluorescence detection (Wyatt Eclipse).' },
  { t: 'Biochemical Characterisation', d: 'Immunoblotting, ELISA, single-molecule dSTORM imaging (Oxford NanoImager), molecular quantification, and omics-based analyses for comprehensive EV cargo profiling.' },
  { t: 'Training & Education', d: 'Hands-on training for individuals and lab groups across all EV isolation and characterisation methods, following the field\'s minimal information guidelines.' },
  { t: 'Consultation', d: 'Expert study design, protocol optimisation, and data interpretation to ensure your EV research meets the highest standards for peer review and publication.' }];


  const equip = [
  { tag: 'NTA', name: 'Nanosight LM10', sub: 'Malvern Panalytical', desc: 'Nanoparticle tracking analysis for size distribution and concentration measurements.' },
  { tag: 'NTA · Zeta Potential', name: 'ZetaView Twin', sub: 'Particle Metrix', desc: 'Dual-laser NTA with direct zeta potential and fluorescence detection for size, concentration, and surface charge.' },
  { tag: 'Super-resolution', name: 'Oxford NanoImager', sub: 'ONI', desc: 'Single-molecule dSTORM imaging for nanoscale morphological assessment of EVs.' },
  { tag: 'AF4 · MALS', name: 'Eclipse + Dawn Helios-II', sub: 'Wyatt Technology', desc: 'Asymmetrical flow field-flow fractionation coupled to multi-angle light scattering, UV and fluorescence detectors.' },
  { tag: 'Ultracentrifugation', name: 'Optima XPN-80', sub: 'Beckman Coulter (×2)', desc: 'Differential & density gradient UC with SW32.1 and SW55 rotors.' },
  { tag: 'High-speed', name: 'Avanti JXN-26', sub: 'Beckman Coulter', desc: 'High-speed centrifugation for pre-clearing and large-EV pellet preparation.' },
  { tag: 'Benchtop', name: 'Centrifuge 5810 R', sub: 'Eppendorf (×3)', desc: 'Refrigerated benchtop centrifugation for routine EV sample preparation workflows.' },
  { tag: 'Automated SEC', name: 'Ascent', sub: 'Everest Biolabs', desc: 'Automated EV isolation via SEC — up to 8 columns in parallel, 12 fractions per column, programmable fraction collection.' },
  { tag: 'Liquid Handler', name: 'Biomek 4000', sub: 'Beckman Coulter', desc: 'Robotic workstation for automated density gradient preparation and fraction collection, with HEPA positive-pressure enclosure.' }];


  return (
    <div>
      {/* ── HERO ── */}
      <Tile surface="dark" style={{ padding: '108px 48px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <img src="assets/core-ev-icon-white.png" alt="CORE EV" style={{ height: 56, width: 'auto', margin: '0 auto 28px', display: 'block' }} />
          <Eyebrow text="Core Facility · Extracellular Vesicles" dark />
          <h1 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 62, lineHeight: 1.06, letterSpacing: -0.5, color: T.onDark, margin: '0 0 26px', textWrap: 'balance' }}>
            The platform for extracellular vesicle science.
          </h1>
          <p style={{ fontFamily: T.fontText, fontSize: 21, fontWeight: 300, lineHeight: 1.55, color: T.onDarkMuted, maxWidth: 620, margin: '0 auto 40px' }}>
            Comprehensive isolation, characterisation, and analysis of EVs and nanoparticles — built for reproducibility and publication-ready results.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <BtnPrimary size="lg" onClick={() => onNav('services')}>Explore services</BtnPrimary>
            <BtnGhost onDark size="lg" onClick={() => onNav('contact')}>Request consultation</BtnGhost>
          </div>
          <div style={{ marginTop: 64, borderRadius: 16, overflow: 'hidden', boxShadow: T.shadowProduct }}>
            <image-slot id="home-hero-image" shape="rounded" radius={16} placeholder="Drop hero image" style={{ display: 'block', width: '100%', height: '460px' }}></image-slot>
          </div>
        </div>
      </Tile>

      {/* ── WHAT WE DO ── */}
      <Tile surface="light" style={{ padding: '88px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 88, alignItems: 'center' }}>
          <div>
            <Eyebrow text="What we do" />
            <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 42, lineHeight: 1.1, letterSpacing: -0.5, margin: '0 0 24px' }}>
              Isolation, characterisation, and analysis of EVs at scale.
            </h2>
            <p style={{ fontFamily: T.fontText, fontSize: 17, lineHeight: 1.72, color: T.ink80, margin: '0 0 16px' }}>
              The CORE EV Facility provides comprehensive services for the isolation, quantification, and characterisation of extracellular vesicles and other nanoparticles — including liposomes, lipid nanoparticles (LNP), and viral particles (lentivirus).
            </p>
            <p style={{ fontFamily: T.fontText, fontSize: 17, lineHeight: 1.72, color: T.ink80, margin: '0 0 32px' }}>
              We combine state-of-the-art instrumentation with deep methodological expertise so that every dataset is reproducible, rigorous, and ready for high-impact publication.
            </p>
            <BtnPrimary onClick={() => onNav('about')}>Learn about us</BtnPrimary>
          </div>
          <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: T.shadowProduct }}>
            <image-slot id="home-lab-feature" shape="rounded" radius={16} placeholder="Drop image (facility / EV imaging)" style={{ display: 'block', width: '100%', height: '400px' }}></image-slot>
          </div>
        </div>
      </Tile>

      {/* ── STATS ── */}
      <Tile surface="parchment" style={{ padding: '88px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 40, lineHeight: 1.1, letterSpacing: -0.5, margin: 0 }}>The facility by the numbers.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
            {[
            { n: '< 20 nm', l: 'Single-molecule resolution', sub: 'Morphological imaging via Oxford NanoImager dSTORM' },
            { n: '3', l: 'Orthogonal isolation methods', sub: 'Differential UC, density gradient UC, and SEC' },
            { n: '9+', l: 'Core instruments', sub: 'Covering isolation through biochemical characterisation' }].
            map((s, i) =>
            <div key={s.n} style={{ padding: '40px 36px', borderTop: `2px solid ${T.blue}`, borderLeft: i > 0 ? `1px solid ${T.hairline}` : 'none' }}>
                <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 54, lineHeight: 1, letterSpacing: -1, color: T.ink, marginBottom: 10 }}>{s.n}</div>
                <div style={{ fontFamily: T.fontText, fontSize: 17, fontWeight: 600, color: T.ink, marginBottom: 6 }}>{s.l}</div>
                <div style={{ fontFamily: T.fontText, fontSize: 14, color: T.ink48, lineHeight: 1.5 }}>{s.sub}</div>
              </div>
            )}
          </div>
        </div>
      </Tile>

      {/* ── SERVICES ACCORDION ── */}
      <Tile surface="dark" style={{ padding: '88px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 88, alignItems: 'start' }}>
          <div>
            <Eyebrow text="Services" dark />
            <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 40, lineHeight: 1.1, letterSpacing: -0.5, color: T.onDark, margin: '0 0 20px' }}>
              Expert EV services, end to end.
            </h2>
            <p style={{ fontFamily: T.fontText, fontSize: 17, lineHeight: 1.72, color: T.onDarkMuted, margin: '0 0 36px' }}>
              From sample receipt to publication-ready data. Every workflow is tailored to your biological question.
            </p>
            <BtnPrimary onClick={() => onNav('services')}>View all services</BtnPrimary>
          </div>
          <div>
            {services.map((s, i) =>
            <div key={i} onClick={() => setOpenSvc(openSvc === i ? -1 : i)} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', padding: '22px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                  <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
                    <span style={{ fontFamily: T.fontText, fontSize: 12, color: T.blueDark, fontWeight: 600, minWidth: 22, flexShrink: 0 }}>0{i + 1}</span>
                    <span style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 20, color: openSvc === i ? T.onDark : T.onDarkMuted, letterSpacing: -0.2, transition: 'color 0.2s' }}>{s.t}</span>
                  </div>
                  <Icon name={openSvc === i ? 'chevronUp' : 'chevronDown'} size={16} color={T.blueDark} />
                </div>
                {openSvc === i &&
              <p style={{ fontFamily: T.fontText, fontSize: 15, lineHeight: 1.65, color: T.onDarkMuted, margin: '14px 0 0 40px', textWrap: 'pretty' }}>{s.d}</p>
              }
              </div>
            )}
          </div>
        </div>
      </Tile>

      {/* ── EQUIPMENT ── */}
      <Tile surface="light" style={{ padding: '88px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow text="Equipment" />
          <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 40, lineHeight: 1.1, letterSpacing: -0.5, margin: '0 0 14px' }}>State-of-the-art instrumentation.</h2>
          <p style={{ fontFamily: T.fontText, fontSize: 19, lineHeight: 1.6, color: T.ink48, margin: '0 auto 52px', maxWidth: 560 }}>
            Our suite covers every step — from EV isolation through single-particle immunophenotyping.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, textAlign: 'left' }}>
            {equip.map((eq) =>
            <div key={eq.name} style={{ background: T.parchment, border: `1px solid ${T.hairline}`, borderRadius: 18, padding: '26px 24px' }}>
                <div style={{ fontFamily: T.fontText, fontSize: 11, fontWeight: 600, color: T.blue, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>{eq.tag}</div>
                <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 18, color: T.ink, marginBottom: 3, letterSpacing: -0.2 }}>{eq.name}</div>
                <div style={{ fontFamily: T.fontText, fontSize: 13, color: T.ink48, marginBottom: 10 }}>{eq.sub}</div>
                <div style={{ fontFamily: T.fontText, fontSize: 14, color: T.ink80, lineHeight: 1.5 }}>{eq.desc}</div>
              </div>
            )}
          </div>
          <div style={{ marginTop: 40 }}>
            <BtnPrimary onClick={() => onNav('equipment')}>View all equipment</BtnPrimary>
          </div>
        </div>
      </Tile>

      {/* ── CTA ── */}
      <Tile surface="dark2" style={{ padding: '108px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 48, lineHeight: 1.07, letterSpacing: -0.5, color: T.onDark, margin: '0 0 20px' }}>
            Ready to start your EV project?
          </h2>
          <p style={{ fontFamily: T.fontText, fontSize: 19, lineHeight: 1.6, color: T.onDarkMuted, margin: '0 0 40px' }}>
            Contact us to discuss your research needs. We will design a workflow tailored to your sample type and scientific question.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <BtnPrimary size="lg" onClick={() => onNav('contact')}>Request a consultation</BtnPrimary>
            <BtnGhost onDark size="lg" onClick={() => onNav('portal')}>User portal</BtnGhost>
          </div>
        </div>
      </Tile>

      {/* ── UGent affiliation band ── */}
      {affiliation.show !== false && (
        <AffiliationBand text={affiliation.text} tone={affiliation.tone} showLogo={affiliation.showLogo} showCrest={affiliation.showCrest} />
      )}
    </div>);

}

/* ══════════════════════════════════════════════════════════════════
   ABOUT (merged with Team intro)
══════════════════════════════════════════════════════════════════ */
function AboutPage({ onNav }) {
  return (
    <div>
      <Tile surface="light" style={{ padding: '88px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 88, alignItems: 'center' }}>
          <div>
            <Eyebrow text="About the facility" />
            <h1 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 48, lineHeight: 1.07, letterSpacing: -0.5, margin: '0 0 26px' }}>
              Built for EV science. Open to all researchers.
            </h1>
            <p style={{ fontFamily: T.fontText, fontSize: 17, lineHeight: 1.72, color: T.ink80, margin: 0 }}>
              The CORE EV empowers the research community with deep expertise, advanced tools, and innovative technologies for studying extracellular vesicles and non-vesicular extracellular particles (including liposomes, lipid nanoparticles (LNP) etc.)
            </p>
          </div>
          <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: T.shadowProduct }}>
            <EVPlaceholder h={420} />
          </div>
        </div>
      </Tile>

      <Tile surface="parchment" style={{ padding: '88px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '280px 1fr', gap: 80 }}>
          <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 40, lineHeight: 1.1, letterSpacing: -0.5, margin: 0 }}>About us</h2>
          <div>
            <p style={{ fontFamily: T.fontText, fontSize: 17, lineHeight: 1.72, color: T.ink80, margin: '0 0 20px' }}>
              The CORE EV provides comprehensive support, from preparation and isolation towards detailed characterisation and analysis in compliance with the field's minimal information guidelines, helping researchers generate faster, more accurate, and more reliable insights in this rapidly evolving field.
            </p>
            <p style={{ fontFamily: T.fontText, fontSize: 17, lineHeight: 1.72, color: T.ink80, margin: '0 0 20px' }}>
              EV isolation relies on biophysical features — size and density. We offer differential ultracentrifugation, density gradient ultracentrifugation, and size exclusion chromatography, alone or in combination, for isolation from complex biological matrices.
            </p>
            <p style={{ fontFamily: T.fontText, fontSize: 17, lineHeight: 1.72, color: T.ink80, margin: 0 }}>
              Characterisation spans biophysical methods (NTA via Nanosight LM10 and ZetaView Twin, the latter adding direct zeta potential measurement; AF4 coupled to MALS, UV, and fluorescence via Wyatt Eclipse) and biochemical analyses (immunoblotting, ELISA, single-molecule dSTORM via Oxford NanoImager, and omics). We also provide training and education for individuals and lab groups, and study design consultation to ensure your EV work meets the highest standards for high-impact publication.
            </p>
          </div>
        </div>
      </Tile>

      <Tile surface="dark" style={{ padding: '88px 48px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <blockquote style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 34, lineHeight: 1.3, letterSpacing: -0.374, color: T.onDark, margin: '0 0 28px', textWrap: 'pretty' }}>
            "Our goal is to make rigorous EV science accessible to every researcher — regardless of their prior experience with these methods."
          </blockquote>
          <p style={{ fontFamily: T.fontText, fontSize: 15, color: T.onDarkMuted }}>— Prof. An Hendrix, Scientific Supervisor, CORE EV</p>
        </div>
      </Tile>

      <Tile surface="light" style={{ padding: '88px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 36, lineHeight: 1.1, letterSpacing: -0.5, margin: '0 0 16px' }}>Work with our team.</h2>
          <p style={{ fontFamily: T.fontText, fontSize: 17, lineHeight: 1.6, color: T.ink48, margin: '0 0 30px' }}>
            Contact us to discuss your project, request a consultation, or submit a sample for analysis.
          </p>
          <CTAPair primary="Contact us" ghost="Meet the team" onPrimary={() => onNav('contact')} onGhost={() => onNav('team')} />
        </div>
      </Tile>
    </div>);

}

/* ══════════════════════════════════════════════════════════════════
   SERVICES
══════════════════════════════════════════════════════════════════ */
function ServicesPage({ onNav }) {
  const [open, setOpen] = React.useState(0);
  const services = [
  {
    t: 'EV Isolation & Separation',
    methods: ['Differential ultracentrifugation', 'Density gradient ultracentrifugation', 'Size exclusion chromatography (SEC)', 'Combined multi-step workflows', 'Support for serum, plasma, urine, conditioned media'],
    d: 'Isolation of EVs relies on their biophysical features — size and density. We offer three orthogonal approaches (differential UC, density gradient UC, and SEC) to isolate EVs from any biological sample. Protocols are tailored to your specific sample type and downstream application, in compliance with the field\'s minimal information guidelines.'
  },
  {
    t: 'Biophysical Characterisation',
    methods: ['NTA — ZetaView Twin / Nanosight LM10', 'AF4 — Eclipse (Wyatt Technology)', 'MALS — Dawn Helios-II (Wyatt)', 'Transmission Electron Microscopy', 'Fluorescence detection (Agilent Infinity 1260)', 'Particle size, concentration & surface charge'],
    d: 'We characterise EV particle size distribution and concentration using nanoparticle tracking analysis (NTA) on the Nanosight LM10 and the ZetaView Twin, which adds direct zeta potential measurement for colloidal-stability assessment. For high-resolution fractionation and multi-parameter sizing, we employ asymmetrical flow field-flow fractionation (AF4) coupled to multi-angle light scattering, UV, and fluorescence detectors — providing an exceptionally complete biophysical picture of your sample.'
  },
  {
    t: 'Biochemical Characterisation',
    methods: ['Immunoblotting', 'ELISA', 'Single-molecule dSTORM imaging (Oxford NanoImager)', 'Molecular quantification', 'Omics-based analysis'],
    d: 'Beyond biophysical sizing, we offer a broad spectrum of biochemical analyses. Super-resolution dSTORM microscopy on the Oxford NanoImager provides single-molecule morphological imaging. Combined with immunoblotting, ELISA, and omics workflows, these tools deliver a comprehensive view of EV cargo and surface composition.'
  },
  {
    t: 'Super-resolution Microscopy',
    methods: ['Oxford NanoImager (ONI)', 'dSTORM single-molecule imaging', 'Nanoscale morphological assessment', 'Fluorescence-based localisation'],
    d: 'The Oxford NanoImager enables direct stochastic optical reconstruction microscopy (dSTORM) at single-molecule resolution. This allows detailed morphological assessment and spatial mapping of EV surface markers at sub-20 nm precision — ideal for validating isolation purity and studying heterogeneous EV populations.'
  },
  {
    t: 'Training & Education',
    methods: ['Hands-on instrument training', 'Protocol development workshops', 'Lab group training sessions', 'Method-specific courses (NTA, AF4, dSTORM, UC)', 'Intake meeting & competency assessment'],
    d: 'We provide formal training for individuals and entire lab groups across all EV isolation and characterisation methods available at the facility. Training is hands-on with real samples. An intake meeting is required for all new users, followed by reservation rules and usage fees as described on the UGent core facility webpage.'
  },
  {
    t: 'Study Design & Consultation',
    methods: ['Experimental design consultation', 'Sample preparation guidance', 'Protocol optimisation', 'Data interpretation support', 'Manuscript preparation assistance'],
    d: 'Expert consultation to ensure your EV research meets the highest quality standards — from study design and protocol selection through data interpretation and reporting. We help researchers generate faster, more accurate, and more reliable insights in compliance with the field\'s minimal information guidelines.'
  }];

  return (
    <div>
      <Tile surface="dark" style={{ padding: '88px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <Eyebrow text="Our Services" dark />
          <h1 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 52, lineHeight: 1.07, letterSpacing: -0.5, color: T.onDark, margin: '0 0 22px' }}>Expertise across the full EV workflow.</h1>
          <p style={{ fontFamily: T.fontText, fontSize: 19, lineHeight: 1.6, color: T.onDarkMuted }}>
            Complete EV analysis services or targeted support for specific steps. Tailored to your sample type and scientific question.
          </p>
        </div>
      </Tile>

      <Tile surface="light" style={{ padding: '88px 48px' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          {services.map((s, i) =>
          <div key={i} style={{ borderBottom: `1px solid ${T.hairline}` }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{
              width: '100%', background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 22, padding: '30px 0', textAlign: 'left'
            }}>
                <span style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.blue, minWidth: 28 }}>0{i + 1}</span>
                <span style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 24, letterSpacing: -0.3, color: T.ink, flex: 1 }}>{s.t}</span>
                <Icon name={open === i ? 'chevronUp' : 'chevronDown'} size={20} color={T.blue} />
              </button>
              {open === i &&
            <div style={{ padding: '0 0 40px 50px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 52 }}>
                  <p style={{ fontFamily: T.fontText, fontSize: 17, lineHeight: 1.72, color: T.ink80, margin: 0, textWrap: 'pretty' }}>{s.d}</p>
                  <div>
                    <div style={{ fontFamily: T.fontText, fontSize: 12, fontWeight: 600, color: T.ink48, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Methods offered</div>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {s.methods.map((m) =>
                  <li key={m} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                          <span style={{ marginTop: 3, flexShrink: 0 }}><Icon name="check" size={14} color={T.blue} /></span>
                          <span style={{ fontFamily: T.fontText, fontSize: 15, color: T.ink80, lineHeight: 1.5 }}>{m}</span>
                        </li>
                  )}
                    </ul>
                  </div>
                </div>
            }
            </div>
          )}
        </div>
      </Tile>

      <Tile surface="parchment" style={{ padding: '88px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 36, letterSpacing: -0.5, margin: '0 0 14px' }}>Not sure what you need?</h2>
          <p style={{ fontFamily: T.fontText, fontSize: 17, lineHeight: 1.6, color: T.ink48, margin: '0 0 28px' }}>
            Our team is happy to help you design the optimal workflow for your sample type and scientific question.
          </p>
          <BtnPrimary onClick={() => onNav('contact')}>Request a consultation</BtnPrimary>
        </div>
      </Tile>
    </div>);

}

/* ══════════════════════════════════════════════════════════════════
   EQUIPMENT
══════════════════════════════════════════════════════════════════ */
function EquipmentPage({ onNav }) {
  const equip = [
  { name: 'Nanosight LM10', mfr: 'Malvern Panalytical', tag: 'NTA — Nanoparticle Tracking Analysis', d: 'Nanoparticle tracking analysis system that measures particle size distribution and concentration using light scattering and Brownian motion. Provides reliable, reproducible quantification of EVs in complex biological fluids.', specs: ['Size range: 10–2,000 nm', 'Concentration measurement', 'Single-particle tracking', 'Video-based analysis'] },
  { name: 'ZetaView Twin', mfr: 'Particle Metrix', tag: 'NTA — Nanoparticle Tracking Analysis with Zeta Potential', d: 'Dual-laser nanoparticle tracking analyser adding direct zeta potential measurement and dual-channel fluorescence to size and concentration analysis — measured in-cell, with no disposables. Ideal for orthogonal sizing and colloidal-stability assessment of EV preparations.', specs: ['Size range: 10–1,000 nm', 'Concentration: 10\u2075–10\u2079 particles/mL', 'Zeta potential: \u2212500 to +500 mV', '2 lasers · up to 6 fluorescence channels'] },
  { name: 'Oxford NanoImager', mfr: 'ONI', tag: 'Super-resolution — dSTORM Microscopy', d: 'Benchtop super-resolution microscope enabling direct stochastic optical reconstruction microscopy (dSTORM). Provides single-molecule localisation imaging for nanoscale morphological assessment of EVs and their surface markers at sub-20 nm precision.', specs: ['< 20 nm localisation precision', 'Single-molecule imaging', 'Multi-colour dSTORM', 'Morphological assessment'] },
  { name: 'Eclipse + Dawn Helios-II', mfr: 'Wyatt Technology', tag: 'AF4 — Asymmetrical Flow Field-Flow Fractionation', d: 'High-resolution fractionation system coupled to multi-angle light scattering (MALS), UV (Shimadzu SPD-M20A), and fluorescence (Agilent Infinity 1260) detectors. Separates and characterises EVs, liposomes, LNPs, and viral particles by size without a stationary phase.', specs: ['MALS (Dawn Helios-II)', 'UV detector (Shimadzu)', 'Fluorescence (Agilent)', 'No stationary phase'] },
  { name: 'Optima XPN-80', mfr: 'Beckman Coulter (×2)', tag: 'Ultracentrifugation — EV Isolation', d: 'High-performance preparative ultracentrifuge for differential and density gradient ultracentrifugation of EVs. Equipped with SW32.1 and SW55 rotors for processing a wide range of sample volumes.', specs: ['SW32.1 & SW55 rotors', 'Max speed: 150,000 × g', 'Iodixanol density gradients', 'Temperature-controlled'] },
  { name: 'Avanti JXN-26', mfr: 'Beckman Coulter', tag: 'High-speed Centrifugation', d: 'High-speed centrifuge for pre-clearing complex biological samples and pelleting large EVs and cell debris. Essential first step in multi-step EV isolation workflows from serum, plasma, urine and conditioned media.', specs: ['Max speed: 26,000 rpm', 'Pre-clearing step', 'Large-EV pelleting', 'Multiple rotor options'] },
  { name: 'Centrifuge 5810 R', mfr: 'Eppendorf (×3)', tag: 'Benchtop Centrifugation', d: 'Refrigerated benchtop centrifuge for routine EV sample preparation. Three units available for concurrent processing, ensuring throughput and flexibility across simultaneous user projects.', specs: ['Refrigerated (4 °C)', '3 units for throughput', 'Swing-bucket & fixed-angle', 'Up to 50 mL tubes'] },
  { name: 'Ascent', mfr: 'Everest Biolabs', tag: 'Automated SEC — EV Isolation', d: 'Automated high-throughput fraction collector for EV isolation via SEC columns. Runs up to 8 columns simultaneously with programmable fraction collection, high-precision optical drop detection, and Column Saver to prevent columns drying out between runs.', specs: ['Up to 8 columns in parallel', 'Up to 12 fractions per column', 'Programmable collection sequence', 'Compatible with Apex & qEV columns'] },
  { name: 'Biomek 4000', mfr: 'Beckman Coulter', tag: 'Liquid Handling — Gradient Automation', d: 'Laboratory automation workstation for robot-assisted density gradient preparation and fraction collection. Features 12 deck positions, liquid-level sensing pipetting (1–1000 µL), and a positive-pressure HEPA enclosure for sterility. Operated with a custom-made script for EV density gradient workflows.', specs: ['12 deck positions', '1–1000 µL liquid-level sensing', 'HEPA positive-pressure enclosure', 'Custom density gradient script'] }];

  return (
    <div>
      <Tile surface="light" style={{ padding: '88px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }} data-comment-anchor="44694e00ac-div-346-9">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Eyebrow text="Equipment" />
            <h1 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 48, letterSpacing: -0.5, margin: '0 0 16px' }}>State-of-the-art instrumentation.</h1>
            <p style={{ fontFamily: T.fontText, fontSize: 19, lineHeight: 1.6, color: T.ink48, maxWidth: 560, margin: '0 auto' }}>
              Our suite covers every step — from EV isolation through single-particle immunophenotyping.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {equip.map((eq) =>
            <div key={eq.name} style={{ background: T.parchment, border: `1px solid ${T.hairline}`, borderRadius: 18, padding: '32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <div style={{ fontFamily: T.fontText, fontSize: 11, fontWeight: 600, color: T.blue, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>{eq.tag}</div>
                  <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 22, letterSpacing: -0.3, color: T.ink }}>{eq.name}</div>
                  <div style={{ fontFamily: T.fontText, fontSize: 13, color: T.ink48, marginTop: 2 }}>{eq.mfr}</div>
                </div>
                <p style={{ fontFamily: T.fontText, fontSize: 15, lineHeight: 1.65, color: T.ink80, margin: 0 }}>{eq.d}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto' }}>
                  {eq.specs.map((sp) =>
                <span key={sp} style={{ fontFamily: T.fontText, fontSize: 12, color: T.ink80, background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 9999, padding: '4px 12px' }}>{sp}</span>
                )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Tile>
      <Tile surface="dark" style={{ padding: '88px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 36, letterSpacing: -0.5, color: T.onDark, margin: '0 0 16px' }}>Schedule instrument time.</h2>
          <p style={{ fontFamily: T.fontText, fontSize: 17, lineHeight: 1.6, color: T.onDarkMuted, margin: '0 0 32px' }}>
            Contact us to discuss your sample needs and schedule an analysis session with our team.
          </p>
          <CTAPair primary="Contact us" ghost="Submit a sample" onDark onPrimary={() => onNav('contact')} onGhost={() => onNav('portal')} />
        </div>
      </Tile>
    </div>);

}

/* ══════════════════════════════════════════════════════════════════
   TEAM
══════════════════════════════════════════════════════════════════ */
function TeamPage({ onNav }) {
  const team = [
  { name: 'Prof. An Hendrix', role: 'Scientific Supervisor', bio: 'Full professor at UGent and head of the Laboratory of Experimental Cancer Research. Scientific lead of the CORE EV facility, with extensive expertise in EV biology, liquid biopsies, and cancer research.', initials: 'AH' },
  { name: 'Dr. Cláudio Pinheiro', role: 'Head of CORE', bio: 'Head of the CORE EV facility. Leads facility operations, user support, and instrument management. Specialist in EV isolation, characterisation, liquid biopsies, and cancer research.', initials: 'CP' },
  { name: 'Frédéric Clement', role: 'Core Research Facilities Manager', bio: 'Core facility manager at the Faculty of Medicine and Health Sciences, UGent. Supports facility governance, user scheduling, onboarding, and day-to-day operational continuity.', initials: 'FC' },
  { name: 'Valerie Baumont', role: 'Core Facility Admin', bio: 'Serves as the central point of contact, helps researchers and staff access facility resources, manages bookings and documentation, and ensures smooth and efficient facility operations.', initials: 'VB' }];

  const steering = [
  { name: 'Prof. Bruno De Geest', dept: 'Department of Pharmaceutics' },
  { name: 'Daisy Flamez, PhD', dept: 'Department of Data Analysis and Mathematical Modelling' },
  { name: 'Prof. Hannelore Denys', dept: 'Board of Governors / Executive Board' },
  { name: 'Prof. Katrien Smits', dept: 'Department of Internal Medicine, Reproduction and Population Medicine' },
  { name: 'Prof. Kristof De Schutter', dept: 'Department of Plants and Crops' },
  { name: 'Prof. Peter Vandenabeele', dept: 'Department of Biomedical Molecular Biology' }];

  return (
    <div>
      <Tile surface="light" style={{ padding: '88px 48px' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Eyebrow text="Our Team" />
            <h1 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 48, letterSpacing: -0.5, margin: '0 0 16px' }}>Scientists committed to your research.</h1>
            <p style={{ fontFamily: T.fontText, fontSize: 19, lineHeight: 1.6, color: T.ink48, maxWidth: 520, margin: '0 auto' }}>
              Deep expertise in EV biology, instrumentation, and data analysis.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {team.map((m) =>
            <div key={m.name} style={{ display: 'flex', gap: 24, padding: '32px', background: T.parchment, border: `1px solid ${T.hairline}`, borderRadius: 18 }}>
                <image-slot id={`team-${m.initials}`} shape="circle" placeholder="Drop photo" style={{ width: '80px', height: '80px', flexShrink: 0 }}></image-slot>
                <div>
                  <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 20, letterSpacing: -0.3, color: T.ink, marginBottom: 4 }}>{m.name}</div>
                  <div style={{ fontFamily: T.fontText, fontSize: 12, fontWeight: 600, color: T.blue, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 }}>{m.role}</div>
                  <p style={{ fontFamily: T.fontText, fontSize: 15, lineHeight: 1.62, color: T.ink80, margin: 0 }}>{m.bio}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Tile>
      <Tile surface="parchment" style={{ padding: '88px 48px' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <div style={{ marginBottom: 44 }}>
            <Eyebrow text="Steering Committee" />
            <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 36, letterSpacing: -0.5, margin: '0 0 14px' }}>Scientific oversight across faculties.</h2>
            <p style={{ fontFamily: T.fontText, fontSize: 17, lineHeight: 1.6, color: T.ink48, maxWidth: 620, margin: 0 }}>
              Promotors from across Ghent University guide the facility's scientific strategy, ensuring CORE EV serves the breadth of EV research at UGent.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {steering.map((m) =>
            <div key={m.name} style={{ padding: '24px 26px', background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 14 }}>
                <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 17, letterSpacing: -0.2, color: T.ink, marginBottom: 6 }}>{m.name}</div>
                <div style={{ fontFamily: T.fontText, fontSize: 14, lineHeight: 1.5, color: T.ink48 }}>{m.dept}</div>
              </div>
            )}
          </div>
        </div>
      </Tile>
      <Tile surface="light" style={{ padding: '88px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 460, margin: '0 auto' }}>
          <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 36, letterSpacing: -0.5, margin: '0 0 14px' }}>Get in touch.</h2>
          <p style={{ fontFamily: T.fontText, fontSize: 17, color: T.ink48, lineHeight: 1.6, margin: '0 0 24px' }}>Our scientists are happy to discuss your research questions and suggest the right approach.</p>
          <BtnPrimary onClick={() => onNav('contact')}>Contact us</BtnPrimary>
        </div>
      </Tile>
    </div>);

}

/* ══════════════════════════════════════════════════════════════════
   PUBLICATIONS
══════════════════════════════════════════════════════════════════ */
function PublicationsPage() {
  const tools = [
    { id: 'evtrack', name: 'EV-TRACK', tagline: 'Transparent reporting & centralizing knowledge in EV research', url: 'https://evtrack.org/', desc: 'A crowdsourcing knowledgebase that centralises EV biology and methodology, coaching researchers through the EV-METRIC to improve reproducibility and transparent reporting.' },
    { id: 'evoke', name: 'EVOKE', tagline: 'Quality control platform for standardised EV research', url: 'https://evoke-tool.org/', desc: 'An advanced quality-control platform that evaluates EV preparation methods across key performance metrics to enhance reproducibility and comparability across studies.' },
  ];
  const pubs = [
  { year: 2026, title: 'No Dye Fits All: Illuminating the Challenges of Fluorescent Extracellular Vesicle Labeling', authors: 'Vrdoljak P, Idrovo-Gavilanes A, Nguyen TH, Vander Cruyssen A, Guilbert N, Pinheiro C, Fabiano M, Pannetta M, Lippens L, Hendrix A', journal: 'Journal of Extracellular Vesicles', doi: '10.1002/jev2.70291' },
  { year: 2024, title: 'Identification and validation of extracellular vesicle reference genes for the normalization of RT-qPCR data', authors: 'Pinheiro C, Guilbert N, Lippens L, Roux Q, Boiy R, Fischer S, Van Dorpe S, De Craene B, Berx G, Boterberg T, Sys G, Denys H, Miinalainen I, Mestdagh P, Vandesompele J, De Wever O, Hendrix A', journal: 'Journal of Extracellular Vesicles', doi: '10.1002/jev2.12421' },
  { year: 2023, title: 'Extracellular vesicle analysis', authors: 'Hendrix A, Lippens L, Pinheiro C, Théry C, Martin-Jaular L, Lötvall J, Lässer C, Hill AF, Witwer KW', journal: 'Nature Reviews Methods Primers', doi: '10.1038/s43586-023-00240-z' },
  { year: 2023, title: 'Integrating automated liquid handling in the separation workflow of extracellular vesicles enhances specificity and reproducibility', authors: 'Van Dorpe S, Lippens L, Boiy R, Pinheiro C, Vergauwen G, De Wever O, Hendrix A', journal: 'Journal of Nanobiotechnology', doi: '10.1186/s12951-023-01917-z' },
  { year: 2021, title: 'Recombinant extracellular vesicles as biological reference material for method development, data normalization and assessment of (pre-)analytical variables', authors: 'Geeurickx E, Lippens L, Rappu P, De Geest BG, De Wever O, Hendrix A', journal: 'Nature Protocols', doi: '10.1038/s41596-020-00446-5' }];

  const years = [...new Set(pubs.map((p) => p.year))].sort((a, b) => b - a);
  return (
    <div>
      <Tile surface="light" style={{ padding: '88px 48px' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Eyebrow text="Resources" />
            <h1 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 48, letterSpacing: -0.5, margin: '0 0 16px' }}>Tools &amp; peer-reviewed science.</h1>
            <p style={{ fontFamily: T.fontText, fontSize: 19, lineHeight: 1.6, color: T.ink48, maxWidth: 460, margin: '0 auto' }}>Open-access tools developed by our team, and CORE EV related publications.</p>
          </div>

          {/* ── Tools ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 72 }}>
            {tools.map((t) => (
              <div key={t.id} style={{ padding: '32px 28px', border: `1px solid ${T.hairline}`, borderRadius: 16, background: T.parchment, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <image-slot id={`tool-logo-${t.id}`} shape="rounded" radius={10} fit="contain" placeholder={`Drop ${t.name} logo`} style={{ width: '100%', height: t.id === 'evoke' ? '110px' : '76px' }}></image-slot>
                <div>
                  <h3 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 22, letterSpacing: -0.3, color: T.ink, margin: '0 0 6px' }}>{t.name}</h3>
                  <p style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.blue, margin: '0 0 10px' }}>{t.tagline}</p>
                  <p style={{ fontFamily: T.fontText, fontSize: 14, lineHeight: 1.6, color: T.ink80, margin: 0 }}>{t.desc}</p>
                </div>
                <div>
                  <BtnPrimary size="sm" onClick={() => window.open(t.url, '_blank', 'noopener')}>
                    Visit {t.name} <Icon name="externalLink" size={13} color="#fff" />
                  </BtnPrimary>
                </div>
              </div>
            ))}
          </div>
          {years.map((y) =>
          <div key={y} style={{ marginBottom: 56 }}>
              <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 30, letterSpacing: -0.5, color: T.ink, marginBottom: 20, borderBottom: `2px solid ${T.blue}`, paddingBottom: 12 }}>{y}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {pubs.filter((p) => p.year === y).map((p, i) =>
              <div key={i} style={{ padding: '24px 28px', border: `1px solid ${T.hairline}`, borderRadius: 12, background: T.parchment }}>
                    <h3 style={{ fontFamily: T.fontText, fontWeight: 600, fontSize: 16, lineHeight: 1.5, color: T.ink, margin: '0 0 8px' }}>{p.title}</h3>
                    <p style={{ fontFamily: T.fontText, fontSize: 14, color: T.ink48, margin: '0 0 4px' }}>{p.authors}</p>
                    <p style={{ fontFamily: T.fontText, fontSize: 14, color: T.blue, margin: '0 0 8px', fontStyle: 'italic' }}>{p.journal}</p>
                    <a href={'#'} onClick={(e) => e.preventDefault()} style={{ fontFamily: T.fontText, fontSize: 12, color: T.blue, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      doi: {p.doi} <Icon name="externalLink" size={11} color={T.blue} />
                    </a>
                  </div>
              )}
              </div>
            </div>
          )}
        </div>
      </Tile>
    </div>);

}

/* ══════════════════════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════════════════════ */
function ContactPage() {
  const [form, setForm] = React.useState({ name: '', email: '', institution: '', subject: '', message: '' });
  const [sent, setSent] = React.useState(false);
  const inp = { width: '100%', fontFamily: T.fontText, fontSize: 16, color: T.ink, background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 8, padding: '13px 16px', outline: 'none', letterSpacing: -0.374 };
  return (
    <div>
      <Tile surface="light" style={{ padding: '88px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 88 }}>
          <div>
            <Eyebrow text="Contact" />
            <h1 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 44, lineHeight: 1.07, letterSpacing: -0.5, margin: '0 0 24px' }}>Let's discuss your research.</h1>
            <p style={{ fontFamily: T.fontText, fontSize: 17, lineHeight: 1.72, color: T.ink80, margin: '0 0 44px' }}>
              Whether submitting a sample for analysis, requesting a method consultation, or exploring training options — we're here to help.
            </p>
            {[
            { icon: 'mail', label: 'Email', value: 'evcore@ugent.be' },
            { icon: 'phone', label: 'Phone', value: '+32 9 332 28 13' },
            { icon: 'mapPin', label: 'Location', value: 'The CORE (entrance 37); Campus UZ Gent, Corneel Heymanslaan 10; 9000 Ghent, Belgium' },
            { icon: 'clock', label: 'Hours', value: 'Mon–Fri, 9:00 AM – 5:00 PM CET' }].
            map((item) =>
            <div key={item.label} style={{ display: 'flex', gap: 16, marginBottom: 22, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 9999, background: T.parchment, border: `1px solid ${T.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={item.icon} size={16} color={T.blue} />
                </div>
                <div>
                  <div style={{ fontFamily: T.fontText, fontSize: 12, fontWeight: 600, color: T.ink48, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontFamily: T.fontText, fontSize: 16, color: T.ink }}>{item.value}</div>
                </div>
              </div>
            )}
          </div>
          {sent ?
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 20, padding: '60px 40px', background: T.parchment, borderRadius: 18, border: `1px solid ${T.hairline}` }}>
              <div style={{ width: 56, height: 56, borderRadius: 9999, background: T.blue, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="check" size={24} color="#fff" />
              </div>
              <div>
                <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 28, letterSpacing: -0.3, margin: '0 0 8px' }}>Message sent.</h2>
                <p style={{ fontFamily: T.fontText, fontSize: 16, color: T.ink48, margin: 0 }}>We'll be in touch within one business day.</p>
              </div>
              <BtnPrimary onClick={() => setSent(false)}>Send another</BtnPrimary>
            </div> :

          <form onSubmit={(e) => {e.preventDefault();setSent(true);}} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink, display: 'block', marginBottom: 6 }}>Name</label>
                  <input style={inp} required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Your name" />
                </div>
                <div>
                  <label style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink, display: 'block', marginBottom: 6 }}>Email</label>
                  <input style={inp} type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="your@email.edu" />
                </div>
              </div>
              <div>
                <label style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink, display: 'block', marginBottom: 6 }}>Institution</label>
                <input style={inp} value={form.institution} onChange={(e) => setForm((f) => ({ ...f, institution: e.target.value }))} placeholder="University / organisation" />
              </div>
              <div>
                <label style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink, display: 'block', marginBottom: 6 }}>Subject</label>
                <select style={{ ...inp, cursor: 'pointer' }} value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}>
                  <option value="">Select a topic…</option>
                  <option>EV Isolation Services</option>
                  <option>Particle Characterisation</option>
                  <option>Immunophenotyping</option>
                  <option>Training & Education</option>
                  <option>Study Design Consultation</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div>
                <label style={{ fontFamily: T.fontText, fontSize: 13, fontWeight: 600, color: T.ink, display: 'block', marginBottom: 6 }}>Message</label>
                <textarea style={{ ...inp, minHeight: 140, resize: 'vertical' }} required value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} placeholder="Describe your sample type, scientific question, and timeline…" />
              </div>
              <BtnPrimary type="submit" style={{ alignSelf: 'flex-start', marginTop: 8 }}>Send message</BtnPrimary>
            </form>
          }
        </div>
      </Tile>
    </div>);

}

Object.assign(window, { Eyebrow, HomePage, AboutPage, ServicesPage, EquipmentPage, TeamPage, PublicationsPage, ContactPage });