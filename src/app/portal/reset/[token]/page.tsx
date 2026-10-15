import type { Metadata } from 'next';
import { TokenScreen } from '../../TokenScreen';

export const metadata: Metadata = { title: 'Reset your password', robots: { index: false } };

export default async function ResetPage({ params }: PageProps<'/portal/reset/[token]'>) {
  const { token } = await params;
  return <TokenScreen token={token} mode="reset" />;
}
