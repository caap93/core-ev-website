import type { Metadata } from 'next';
import { TokenScreen } from '../../TokenScreen';

export const metadata: Metadata = { title: 'Activate your account', robots: { index: false } };

export default async function InvitePage({ params }: PageProps<'/portal/invite/[token]'>) {
  const { token } = await params;
  return <TokenScreen token={token} mode="invite" />;
}
