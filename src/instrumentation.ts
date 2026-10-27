export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.SKIP_BOOTSTRAP !== 'true') {
    const { bootstrap } = await import('./lib/bootstrap');
    try {
      await bootstrap();
    } catch (err) {
      // Keep serving the public site; portal pages will fail until the database works.
      console.error('[bootstrap] Database setup failed — run `npm run check` for details.', err);
    }
  }
}
