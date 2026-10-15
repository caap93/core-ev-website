'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/actions/auth';
import { Icon, type IconName } from '@/components/Icon';
import type { SessionUser } from '@/lib/auth';
import { initials } from '@/lib/projects';

const RESEARCHER_TABS: { href: string; label: string; icon: IconName }[] = [
  { href: '/portal/dashboard', label: 'Dashboard', icon: 'activity' },
  { href: '/portal/projects', label: 'My projects', icon: 'folder' },
  { href: '/portal/upload', label: 'Upload files', icon: 'upload' },
  { href: '/portal/messages', label: 'Contact facility', icon: 'mail' },
];

const ADMIN_TABS: { href: string; label: string; icon: IconName }[] = [
  { href: '/portal/admin', label: 'Overview', icon: 'activity' },
  { href: '/portal/admin/projects', label: 'All projects', icon: 'folder' },
  { href: '/portal/admin/new-project', label: 'Add project', icon: 'plus' },
  { href: '/portal/admin/users', label: 'Users', icon: 'user' },
  { href: '/portal/admin/messages', label: 'Messages', icon: 'inbox' },
];

export function Sidebar({ user, unread }: { user: SessionUser; unread: number }) {
  const pathname = usePathname();
  const isAdmin = user.role === 'admin';
  const tabs = isAdmin ? ADMIN_TABS : RESEARCHER_TABS;
  // Longest matching prefix wins, so /portal/admin/projects doesn't also light up /portal/admin.
  const active = tabs
    .filter((t) => pathname === t.href || pathname.startsWith(`${t.href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;

  return (
    <aside className="sidebar">
      <div className="sidebar-user">
        <div className="avatar">{initials(user.name)}</div>
        <div style={{ minWidth: 0 }}>
          <div className="sidebar-name">{user.name}</div>
          {isAdmin ? <div className="sidebar-role">ADMIN</div> : <div className="sidebar-email">{user.email}</div>}
        </div>
      </div>
      <nav className="sidebar-nav" aria-label="Portal">
        {tabs.map((t) => (
          <Link key={t.href} href={t.href} className={`side-link${active === t.href ? ' active' : ''}`} aria-current={active === t.href ? 'page' : undefined}>
            <Icon name={t.icon} size={15} />
            {t.label}
            {t.href === '/portal/admin/messages' && unread > 0 && <span className="count" aria-label={`${unread} unread`}>{unread}</span>}
          </Link>
        ))}
      </nav>
      <form action={logout} className="sidebar-foot">
        <button type="submit" className="side-link">
          <Icon name="logout" size={15} /> Sign out
        </button>
      </form>
    </aside>
  );
}
