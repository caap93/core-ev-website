/* Project domain rules shared by the researcher and admin views. Pure — safe on client and server. */

export const PROJECT_STATUSES = ['Awaiting sample', 'In Progress', 'On Hold', 'Completed'] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const STATUS_COLORS: Record<string, string> = {
  'Awaiting sample': '#8a6000',
  'In Progress': '#0066cc',
  'On Hold': '#6e3ab0',
  Completed: '#1a7a44',
};

export function statusColor(status: string) {
  return STATUS_COLORS[status] ?? '#7a7a7a';
}

export function isProjectStatus(s: string): s is ProjectStatus {
  return (PROJECT_STATUSES as readonly string[]).includes(s);
}

export const SERVICE_TYPES = [
  'EV Isolation & Characterisation',
  'Biophysical Characterisation only',
  'Biochemical Characterisation only',
  'Super-resolution Microscopy (dSTORM)',
  'Training & Education',
  'Consultation',
];

export const DEFAULT_STEPS = [
  'Sample received & logged',
  'EV isolation',
  'Biophysical characterisation',
  'Biochemical characterisation',
  'Data analysis & QC',
  'Final report delivered',
];

export const INSTRUMENT_STATUSES = ['Available', 'Booked', 'In use', 'Maintenance'] as const;
export const INSTRUMENT_COLORS: Record<string, string> = {
  Available: '#1a7a44',
  Booked: '#0066cc',
  'In use': '#8a6000',
  Maintenance: '#b0201a',
};

/** Formats a date as YYYY-MM-DD (the format used throughout the prototype). */
export function isoDate(d: Date | string) {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toISOString().slice(0, 10);
}

export function progressPct(steps: { doneAt: Date | string | null }[]) {
  if (steps.length === 0) return 0;
  return Math.round((steps.filter((s) => s.doneAt).length / steps.length) * 100);
}

/**
 * Secondary label under each timeline step: the completion date when done; for the
 * first open step, "In progress" / "Awaiting" depending on project status; else "Pending".
 */
export function stepDateLabels(steps: { doneAt: Date | string | null }[], status: string) {
  const firstOpen = steps.findIndex((s) => !s.doneAt);
  return steps.map((s, i) => {
    if (s.doneAt) return isoDate(s.doneAt);
    if (i === firstOpen && status === 'In Progress') return 'In progress';
    if (i === firstOpen && status === 'Awaiting sample') return 'Awaiting';
    return 'Pending';
  });
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function initials(name: string) {
  return name
    .replace(/^(dr\.?|prof\.?)\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/** "Welcome back, Martinez." — last word of the name, as in the prototype. */
export function surname(name: string) {
  return name.trim().split(/\s+/).slice(-1)[0] ?? name;
}

export function nextProjectCode(year: number, existingCodes: string[]) {
  const prefix = `PRJ-${year}-`;
  const max = existingCodes
    .filter((c) => c.startsWith(prefix))
    .map((c) => Number(c.slice(prefix.length)))
    .filter(Number.isFinite)
    .reduce((a, b) => Math.max(a, b), 0);
  return `${prefix}${String(max + 1).padStart(3, '0')}`;
}

export const ALLOWED_UPLOAD_EXTENSIONS = ['.pdf', '.docx', '.doc', '.csv', '.xlsx', '.xls', '.tif', '.tiff', '.png', '.jpg', '.jpeg', '.zip', '.txt', '.pptx'];

export function isAllowedUpload(name: string) {
  const dot = name.lastIndexOf('.');
  return dot > 0 && ALLOWED_UPLOAD_EXTENSIONS.includes(name.slice(dot).toLowerCase());
}

export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;
