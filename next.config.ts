import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Docker builds use the self-contained 'standalone' output; Plesk / `node app.js` use the normal one.
  output: process.env.NEXT_STANDALONE === 'true' ? 'standalone' : undefined,
  poweredByHeader: false,
  serverExternalPackages: ['pg', 'bcryptjs', 'nodemailer'],
};

export default nextConfig;
