import Link from 'next/link';

const COLS = [
  { h: 'Facility', items: [{ l: 'About', href: '/about' }, { l: 'Team', href: '/team' }, { l: 'Contact', href: '/contact' }] },
  { h: 'Services', items: [{ l: 'EV Isolation', href: '/services#isolation' }, { l: 'Characterization', href: '/services#biophysical' }, { l: 'Immunophenotyping', href: '/services#biochemical' }, { l: 'Consultation', href: '/services#consultation' }] },
  { h: 'Resources', items: [{ l: 'Equipment', href: '/equipment' }, { l: 'Publications', href: '/resources#publications' }, { l: 'Protocols', href: '/contact' }] },
  { h: 'Portal', items: [{ l: 'User login', href: '/portal' }, { l: 'Submit sample', href: '/portal' }, { l: 'Track project', href: '/portal' }] },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ maxWidth: 1200 }}>
        <div className="footer-brand">
          <img src="/images/core-ev-icon.png" alt="" width={28} height={28} />
          <span>CORE-EV</span>
        </div>
        <div className="footer-note">
          For research use only. Not for use in diagnostic procedures. CORE Extracellular Vesicles Core Facility.
        </div>
        <div className="footer-cols">
          {COLS.map((c) => (
            <div key={c.h}>
              <div className="footer-h">{c.h}</div>
              {c.items.map((it) => <Link key={it.l} href={it.href} className="footer-link">{it.l}</Link>)}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} CORE Extracellular Vesicles. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link href="/privacy">Privacy</Link>
            <a href="https://www.ugent.be/en" target="_blank" rel="noopener noreferrer">Ghent University</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
