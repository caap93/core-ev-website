// Run migrations + admin/instrument seed manually: `npm run db:migrate`
import 'dotenv/config';
import { bootstrap } from '../src/lib/bootstrap';

bootstrap()
  .then(() => { console.log('Database ready.'); process.exit(0); })
  .catch((err) => { console.error(err); process.exit(1); });
