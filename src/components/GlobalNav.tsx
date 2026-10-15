'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ButtonLink } from './Button';
import { Icon } from './Icon';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/equipment', label: 'Equipment' },
  { href: '/team', label: 'Team' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
];

export function GlobalNav() {
  const pathname = usePathname();
  // The mobile menu is open only for the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  const links = LINKS.map((l) => (
    <Link key={l.href} href={l.href} className={`nav-link${isActive(l.href) ? ' active' : ''}`} aria-current={isActive(l.href) ? 'page' : undefined}>
      {l.label}
    </Link>
  ));

  return (
    <>
      <nav className="nav" aria-label="Main">
        <Link href="/" className="nav-brand">
          <img src="/images/core-ev-icon-white.png" alt="" width={20} height={20} />
          CORE-EV
        </Link>
        <div className="nav-links">{links}</div>
        <ButtonLink href="/portal" size="sm" className="nav-cta">User portal</ButtonLink>
        <button className="nav-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="nav-panel" onClick={() => setOpenOn(open ? null : pathname)}>
          <Icon name={open ? 'x' : 'menu'} size={20} />
        </button>
      </nav>
      <div id="nav-panel" className={`nav-panel${open ? ' open' : ''}`}>
        {links}
        <ButtonLink href="/portal" size="sm">User portal</ButtonLink>
      </div>
    </>
  );
}
