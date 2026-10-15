import { requireUser } from '@/lib/auth';
import { countUnreadMessages } from '@/lib/queries';
import { Sidebar } from './Sidebar';

export default async function PortalAppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const unread = user.role === 'admin' ? await countUnreadMessages() : 0;
  return (
    <div className="portal">
      <Sidebar user={user} unread={unread} />
      <main className="portal-main">{children}</main>
    </div>
  );
}
