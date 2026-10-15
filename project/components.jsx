/* CORE EV — Shared design system primitives */

const T = {
  blue: '#0066cc',
  blueFocus: '#0071e3',
  blueDark: '#2997ff',
  ink: '#1d1d1f',
  ink80: '#333333',
  ink48: '#7a7a7a',
  canvas: '#ffffff',
  parchment: '#f5f5f7',
  pearl: '#fafafc',
  tile1: '#272729',
  tile2: '#2a2a2c',
  tile3: '#252527',
  black: '#000000',
  onDark: '#ffffff',
  onDarkMuted: '#b0b0b5',
  hairline: '#e0e0e0',
  frost: 'rgba(245,245,247,0.88)',
  shadowProduct: 'rgba(0,0,0,0.22) 3px 5px 30px 0',
  fontDisplay: '"SF Pro Display", system-ui, -apple-system, "Inter", sans-serif',
  fontText: '"SF Pro Text", system-ui, -apple-system, "Inter", sans-serif'
};

function Icon({ name, size = 16, color = 'currentColor', sw = 1.6 }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>,
    x: <><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>,
    chevronRight: <path d="M9 6l6 6-6 6" />,
    chevronDown: <path d="M6 9l6 6 6-6" />,
    chevronUp: <path d="M18 15l-6-6-6 6" />,
    arrowRight: <><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></>,
    upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M17 8l-5-5-5 5" /><path d="M12 3v12" /></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 2" /></>,
    check: <path d="M20 6L9 17l-5-5" />,
    mail: <><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" /></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>,
    folder: <><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>,
    externalLink: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4 2.18H7a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
    mapPin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
    beaker: <><path d="M4.5 3h15" /><path d="M6 3v10a6 6 0 0 0 12 0V3" /><path d="M6 14h12" /></>,
    flasks: <><path d="M10 2v7.31" /><path d="M14 9.3V1.99" /><path d="M8.5 2h7" /><path d="M14 9.3a6.5 6.5 0 1 1-4 0" /></>,
    microscope: <><path d="M6 18h8" /><path d="M3 22h18" /><path d="M14 22a7 7 0 1 0 0-14h-1" /><path d="M9 14h2" /><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" /><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    copy: <><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>,
    link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>,
    send: <><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></>
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
    style={{ display: 'block', flexShrink: 0 }}>
      {paths[name]}
    </svg>);

}

function BtnPrimary({ children, onClick, size = 'md', style = {}, type = 'button' }) {
  const configs = { lg: { p: '14px 28px', fs: 18, fw: 300 }, md: { p: '11px 22px', fs: 17, fw: 400 }, sm: { p: '8px 18px', fs: 14, fw: 400 } };
  const c = configs[size] || configs.md;
  return (
    <button type={type} className="press" onClick={onClick} style={{
      background: T.blue, color: '#fff', border: 'none', cursor: 'pointer',
      borderRadius: 9999, fontFamily: T.fontText, fontSize: c.fs, fontWeight: c.fw,
      letterSpacing: -0.374, padding: c.p, display: 'inline-flex', alignItems: 'center', gap: 8, ...style
    }}>{children}</button>);

}

function BtnGhost({ children, onClick, onDark, size = 'md', style = {}, type = 'button' }) {
  const c = onDark ? T.blueDark : T.blue;
  const pads = { lg: '13px 28px', md: '10px 22px', sm: '7px 18px' };
  return (
    <button type={type} className="press" onClick={onClick} style={{
      background: 'transparent', color: c, border: `1px solid ${c}`, cursor: 'pointer',
      borderRadius: 9999, fontFamily: T.fontText, fontSize: 17, letterSpacing: -0.374,
      padding: pads[size] || pads.md, display: 'inline-flex', alignItems: 'center', gap: 8, ...style
    }}>{children}</button>);

}

function CTAPair({ primary, ghost, onDark, onPrimary, onGhost, center = true }) {
  return (
    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: center ? 'center' : 'flex-start', marginTop: 32 }}>
      {primary && <BtnPrimary onClick={onPrimary}>{primary}</BtnPrimary>}
      {ghost && <BtnGhost onDark={onDark} onClick={onGhost}>{ghost}</BtnGhost>}
    </div>);

}

function GlobalNav({ currentPage, onNav }) {
  const links = [
  { k: 'home', l: 'Home' }, { k: 'services', l: 'Services' },
  { k: 'equipment', l: 'Equipment' }, { k: 'team', l: 'Team' },
  { k: 'publications', l: 'Resources' }, { k: 'contact', l: 'Contact' }];

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100, background: T.black,
      height: 44, display: 'flex', alignItems: 'center', padding: '0 28px', gap: 0
    }}>
      <button onClick={() => onNav('home')} style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        display: 'flex', alignItems: 'center', gap: 8,
        fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 15, color: '#f5f5f7',
        letterSpacing: -0.3, marginRight: 36
      }}>
        <img src="assets/core-ev-icon-white.png" alt="" style={{ height: 20, width: 'auto', display: 'block' }} />
        CORE-EV
      </button>
      <div style={{ display: 'flex', gap: 24, flex: 1, alignItems: 'center' }}>
        {links.map((l) =>
        <button key={l.k} onClick={() => onNav(l.k)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: T.fontText, fontSize: 12, letterSpacing: -0.12,
          color: currentPage === l.k ? '#fff' : 'rgba(245,245,247,0.65)',
          paddingBottom: currentPage === l.k ? 1 : 2,
          borderBottom: currentPage === l.k ? '1px solid rgba(255,255,255,0.7)' : '1px solid transparent',
          transition: 'color 0.15s'
        }}>{l.l}</button>
        )}
      </div>
      <BtnPrimary size="sm" onClick={() => onNav('portal')}>User portal</BtnPrimary>
    </nav>);

}

function Tile({ surface = 'light', children, style = {} }) {
  const maps = {
    light: { bg: T.canvas, color: T.ink },
    parchment: { bg: T.parchment, color: T.ink },
    dark: { bg: T.tile1, color: T.onDark },
    dark2: { bg: T.tile2, color: T.onDark },
    dark3: { bg: T.tile3, color: T.onDark },
    black: { bg: T.black, color: T.onDark }
  };
  const s = maps[surface] || maps.light;
  return (
    <section style={{ background: s.bg, color: s.color, ...style }}>
      {children}
    </section>);

}

/* Scientific EV imagery placeholder — simulates nanoscopy/TEM imagery */
function EVPlaceholder({ h = 400, dark = false, label = '' }) {
  const bg = dark ? '#1a1c1e' : '#e8edf2';
  const rings = dark ?
  ['#1e3352', '#233c60', '#1a2e46', '#203859', '#182b43'] :
  ['#c2d5e8', '#b4c9df', '#cad8e9', '#b8cedf', '#c6d4e5'];
  return (
    <div style={{ width: '100%', height: h, background: bg, borderRadius: 12, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="100%" height="100%" viewBox="0 0 900 500" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }} data-comment-anchor="495b03f526-svg-161-7">
        {/* Main large vesicle */}
        <circle cx="440" cy="240" r="130" fill={rings[0]} opacity="0.9" />
        <circle cx="440" cy="240" r="108" fill={rings[1]} opacity="0.7" />
        <circle cx="440" cy="240" r="86" fill={rings[2]} opacity="0.5" />
        <circle cx="440" cy="240" r="60" fill={rings[3]} opacity="0.4" />
        {/* Surface protein dots */}
        {[...Array(16)].map((_, i) => {
          const a = i / 16 * Math.PI * 2;
          return <circle key={i} cx={440 + 133 * Math.cos(a)} cy={240 + 133 * Math.sin(a)} r="5" fill={dark ? '#2e5a8c' : '#8cafc8'} opacity="0.9" />;
        })}
        {/* Smaller vesicles */}
        <circle cx="185" cy="165" r="72" fill={rings[0]} opacity="0.75" />
        <circle cx="185" cy="165" r="55" fill={rings[1]} opacity="0.5" />
        <circle cx="185" cy="165" r="36" fill={rings[4]} opacity="0.4" />
        {[...Array(10)].map((_, i) => {
          const a = i / 10 * Math.PI * 2;
          return <circle key={i} cx={185 + 75 * Math.cos(a)} cy={165 + 75 * Math.sin(a)} r="4" fill={dark ? '#2e5a8c' : '#8cafc8'} opacity="0.8" />;
        })}
        <circle cx="710" cy="310" r="90" fill={rings[0]} opacity="0.8" />
        <circle cx="710" cy="310" r="70" fill={rings[2]} opacity="0.55" />
        <circle cx="710" cy="310" r="46" fill={rings[4]} opacity="0.4" />
        {[...Array(12)].map((_, i) => {
          const a = i / 12 * Math.PI * 2;
          return <circle key={i} cx={710 + 93 * Math.cos(a)} cy={310 + 93 * Math.sin(a)} r="4" fill={dark ? '#2e5a8c' : '#8cafc8'} opacity="0.8" />;
        })}
        {/* Tiny background vesicles */}
        {[
        [80, 380, 32], [820, 80, 28], [640, 80, 40], [280, 400, 35],
        [760, 170, 24], [120, 70, 22], [820, 420, 20], [350, 60, 18]].
        map(([x, y, r], i) =>
        <circle key={i} cx={x} cy={y} r={r} fill={rings[i % rings.length]} opacity="0.5" />
        )}
      </svg>
      {label && <span style={{ position: 'relative', fontFamily: T.fontText, fontSize: 11, color: dark ? '#3a4a5a' : '#8a9aaa', letterSpacing: 1, textTransform: 'uppercase' }}>{label}</span>}
    </div>);

}

function Footer({ onNav }) {
  const cols = [
  { h: 'Facility', items: [{ l: 'About', k: 'about' }, { l: 'Team', k: 'team' }, { l: 'Contact', k: 'contact' }] },
  { h: 'Services', items: [{ l: 'EV Isolation', k: 'services' }, { l: 'Characterization', k: 'services' }, { l: 'Immunophenotyping', k: 'services' }, { l: 'Consultation', k: 'services' }] },
  { h: 'Resources', items: [{ l: 'Equipment', k: 'equipment' }, { l: 'Publications', k: 'publications' }, { l: 'Protocols', k: 'contact' }] },
  { h: 'Portal', items: [{ l: 'User login', k: 'portal' }, { l: 'Submit sample', k: 'portal' }, { l: 'Track project', k: 'portal' }] }];

  return (
    <footer style={{ background: T.parchment, padding: '52px 48px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <img src="assets/core-ev-icon.png" alt="CORE EV" style={{ height: 28, width: 'auto', display: 'block' }} />
          <span style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 16, letterSpacing: -0.3, color: T.ink }}>CORE-EV</span>
        </div>
        <div style={{ fontFamily: T.fontText, fontSize: 12, color: T.ink48, lineHeight: 1.6, paddingBottom: 20, borderBottom: '1px solid #d2d2d7', maxWidth: 680, marginBottom: 28 }}>
          For research use only. Not for use in diagnostic procedures. CORE Extracellular Vesicles Core Facility.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
          {cols.map((c) =>
          <div key={c.h}>
              <div style={{ fontFamily: T.fontText, fontSize: 14, fontWeight: 600, letterSpacing: -0.224, color: T.ink, marginBottom: 4 }}>{c.h}</div>
              {c.items.map((it) =>
            <button key={it.l} onClick={() => onNav(it.k)} style={{
              display: 'block', background: 'none', border: 'none', cursor: 'pointer',
              color: T.ink80, fontFamily: T.fontText, fontSize: 17, lineHeight: 2.41, letterSpacing: -0.2, padding: 0
            }}>{it.l}</button>
            )}
            </div>
          )}
        </div>
        <div style={{ borderTop: '1px solid #d2d2d7', marginTop: 24, paddingTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: T.fontText, fontSize: 12, color: T.ink48 }}>© 2026 CORE Extracellular Vesicles. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy', 'Terms', 'Sitemap'].map((l) =>
            <a key={l} href="#" onClick={(e) => e.preventDefault()} style={{ fontFamily: T.fontText, fontSize: 12, color: T.ink48 }}>{l}</a>
            )}
          </div>
        </div>
      </div>
    </footer>);

}

/* ── UGent affiliation band (soft, homepage bottom) ── */
function AffiliationBand({ text = 'CORE EV is a core facility within', tone = 'parchment', showLogo = true, showCrest = true }) {
  const tones = {
    parchment: { bg: T.parchment, border: T.hairline, label: T.ink48, word: T.ink, sub: T.ink48, slotDark: false },
    white: { bg: '#ffffff', border: T.hairline, label: T.ink48, word: T.ink, sub: T.ink48, slotDark: false },
    dark: { bg: T.tile1, border: 'rgba(255,255,255,0.12)', label: T.onDarkMuted, word: T.onDark, sub: T.onDarkMuted, slotDark: true }
  };
  const c = tones[tone] || tones.parchment;
  return (
    <div style={{ background: c.bg, borderTop: `1px solid ${c.border}`, padding: '56px 48px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap', textAlign: 'center' }}>
        <span style={{ fontFamily: T.fontText, fontSize: 13, letterSpacing: 0.3, color: c.label }}>{text}</span>
        <image-slot id="ugent-official-logo" shape="rect" fit="contain" placeholder="Drop official UGent logo" style={{ width: '220px', height: '176px' }} data-comment-anchor="7ae2b556d1-image-slot-260-11"></image-slot>
      </div>
    </div>);

}

Object.assign(window, { T, Icon, BtnPrimary, BtnGhost, CTAPair, GlobalNav, Tile, EVPlaceholder, Footer, AffiliationBand });