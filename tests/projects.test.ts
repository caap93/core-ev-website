import { describe, expect, it } from 'vitest';
import { formatBytes, initials, isAllowedUpload, nextProjectCode, progressPct, stepDateLabels } from '../src/lib/projects';

describe('nextProjectCode', () => {
  it('starts at 001 for a new year', () => {
    expect(nextProjectCode(2026, ['PRJ-2025-047'])).toBe('PRJ-2026-001');
  });
  it('increments the highest code of the year', () => {
    expect(nextProjectCode(2026, ['PRJ-2026-002', 'PRJ-2026-010', 'PRJ-2025-099'])).toBe('PRJ-2026-011');
  });
});

describe('progress', () => {
  it('computes percentage of completed steps', () => {
    expect(progressPct([{ doneAt: new Date() }, { doneAt: null }, { doneAt: null }])).toBe(33);
    expect(progressPct([])).toBe(0);
  });
  it('labels the first open step by project status', () => {
    const steps = [{ doneAt: new Date('2026-01-02T10:00:00Z') }, { doneAt: null }, { doneAt: null }];
    expect(stepDateLabels(steps, 'In Progress')).toEqual(['2026-01-02', 'In progress', 'Pending']);
    expect(stepDateLabels(steps, 'Awaiting sample')).toEqual(['2026-01-02', 'Awaiting', 'Pending']);
    expect(stepDateLabels(steps, 'On Hold')).toEqual(['2026-01-02', 'Pending', 'Pending']);
  });
});

describe('formatting', () => {
  it('formats sizes', () => {
    expect(formatBytes(500)).toBe('500 B');
    expect(formatBytes(86_016)).toBe('84 KB');
    expect(formatBytes(3_355_443)).toBe('3.2 MB');
  });
  it('builds initials without titles', () => {
    expect(initials('Dr. Cláudio Pinheiro')).toBe('CP');
    expect(initials('Prof. An Hendrix')).toBe('AH');
  });
  it('restricts upload types', () => {
    expect(isAllowedUpload('report.PDF')).toBe(true);
    expect(isAllowedUpload('run.exe')).toBe(false);
    expect(isAllowedUpload('noext')).toBe(false);
  });
});
