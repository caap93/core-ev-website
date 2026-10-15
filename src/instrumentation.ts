export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.SKIP_BOOTSTRAP !== 'true') {
    const { bootstrap } = await import('./lib/bootstrap');
    await bootstrap();
  }
}
