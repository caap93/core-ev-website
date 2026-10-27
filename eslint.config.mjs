import next from 'eslint-config-next';

const config = [
  { ignores: ['app.js', 'scripts/check.js', 'design/**', '.next/**', 'node_modules/**', 'drizzle/**', 'next-env.d.ts'] },
  ...next,
  // Images are pre-optimised static WebP/PNG files; plain <img> keeps markup identical to the design.
  { rules: { '@next/next/no-img-element': 'off' } },
];

export default config;
