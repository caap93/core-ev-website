/** Server-side configuration read from environment variables. */
export const env = {
  appUrl: (process.env.APP_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
  uploadDir: process.env.UPLOAD_DIR ?? './uploads',
  smtp: {
    host: process.env.SMTP_HOST ?? '',
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER ?? '',
    password: process.env.SMTP_PASSWORD ?? '',
  },
  mailFrom: process.env.MAIL_FROM ?? 'CORE EV <evcore@ugent.be>',
  facilityInbox: process.env.FACILITY_INBOX ?? 'evcore@ugent.be',
};

