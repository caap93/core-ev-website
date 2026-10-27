// Startup file for hosting panels such as Plesk (Phusion Passenger) or plain `node app.js`.
// Run `npm run build` first. Settings come from environment variables or a .env file.
const path = require('node:path');
const { createServer } = require('node:http');
const next = require('next');

process.env.NODE_ENV = 'production';
const dir = __dirname;
process.chdir(dir); // relative paths (e.g. UPLOAD_DIR=./uploads) resolve inside the app folder
require('@next/env').loadEnvConfig(dir);

const app = next({ dev: false, dir });
const handle = app.getRequestHandler();
const port = Number(process.env.PORT) || 3000;

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`CORE EV running on port ${port} (${path.basename(dir)})`);
  });
}).catch((err) => {
  console.error('Failed to start CORE EV:', err);
  process.exit(1);
});
