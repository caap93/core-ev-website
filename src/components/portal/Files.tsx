'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState, useTransition } from 'react';
import { deleteFile } from '@/actions/portal';
import { Icon } from '@/components/Icon';
import { ALLOWED_UPLOAD_EXTENSIONS, formatBytes } from '@/lib/projects';

export const ACCEPT = ALLOWED_UPLOAD_EXTENSIONS.join(',');

/** POSTs files to a project; resolves to an error message or null. */
export async function uploadFiles(projectId: number, files: File[]): Promise<string | null> {
  const fd = new FormData();
  files.forEach((f) => fd.append('files', f));
  try {
    const res = await fetch(`/api/projects/${projectId}/files`, { method: 'POST', body: fd });
    if (res.ok) return null;
    const data = await res.json().catch(() => ({}));
    return data.error ?? 'Upload failed. Please try again.';
  } catch {
    return 'Upload failed — check your connection and try again.';
  }
}

export function UploadButton({ projectId, label }: { projectId: number; label: string }) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (!files.length) return;
    setBusy(true);
    setError('');
    const err = await uploadFiles(projectId, files);
    setBusy(false);
    if (err) setError(err);
    else router.refresh();
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
      <button type="button" className="solid-pill" disabled={busy} style={{ opacity: busy ? 0.65 : 1 }} onClick={() => input.current?.click()}>
        <Icon name="upload" size={13} color="#fff" /> {busy ? 'Uploading…' : label}
      </button>
      <input ref={input} type="file" multiple accept={ACCEPT} hidden onChange={onChange} />
      {error && <span role="alert" style={{ fontSize: 12, color: 'var(--red)' }}>{error}</span>}
    </div>
  );
}

type FileItem = { id: string; originalName: string; sizeBytes: number; createdAt: Date; canDelete: boolean; uploader?: string };

export function FileList({ files, emptyText = 'No files yet.' }: { files: FileItem[]; emptyText?: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState('');
  if (files.length === 0) return <p className="empty">{emptyText}</p>;

  function remove(f: FileItem) {
    if (!window.confirm(`Delete ${f.originalName}? This can't be undone.`)) return;
    startTransition(async () => {
      const res = await deleteFile(f.id);
      setError(res.error ?? '');
    });
  }

  return (
    <div className="stack tight" style={{ opacity: pending ? 0.6 : 1 }}>
      {files.map((f) => (
        <div key={f.id} className="file-row">
          <Icon name="file" size={15} color="var(--blue)" />
          <span className="file-name" title={f.originalName}>{f.originalName}</span>
          {f.uploader && <span className="file-meta">{f.uploader}</span>}
          <span className="file-meta">{formatBytes(f.sizeBytes)}</span>
          <span className="file-meta">{f.createdAt.toISOString().slice(0, 10)}</span>
          <a href={`/api/files/${f.id}`} className="file-action" download>
            <Icon name="download" size={13} color="var(--blue)" /> Download
          </a>
          {f.canDelete && (
            <button type="button" className="icon-btn danger" title="Delete file" aria-label={`Delete ${f.originalName}`} onClick={() => remove(f)}>
              <Icon name="x" size={14} />
            </button>
          )}
        </div>
      ))}
      {error && <div className="alert-error" role="alert">{error}</div>}
    </div>
  );
}
