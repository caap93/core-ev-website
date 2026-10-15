'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { ACCEPT, FileList, uploadFiles } from '@/components/portal/Files';
import { formatBytes, isAllowedUpload, MAX_UPLOAD_BYTES } from '@/lib/projects';

type Props = {
  projects: { id: number; code: string; title: string }[];
  uploaded: { id: string; originalName: string; sizeBytes: number; createdAt: Date; projectCode: string }[];
};

export function UploadArea({ projects, uploaded }: Props) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [projectId, setProjectId] = useState(projects[0].id);
  const [staged, setStaged] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  function add(files: File[]) {
    setNotice('');
    const rejected = files.filter((f) => !isAllowedUpload(f.name) || f.size > MAX_UPLOAD_BYTES);
    setError(rejected.length ? `Not added: ${rejected.map((f) => f.name).join(', ')} (unsupported type or over 50 MB).` : '');
    setStaged((s) => [...s, ...files.filter((f) => !rejected.includes(f))]);
  }

  async function upload() {
    setBusy(true);
    setError('');
    const err = await uploadFiles(projectId, staged);
    setBusy(false);
    if (err) return setError(err);
    const code = projects.find((p) => p.id === projectId)?.code;
    setNotice(`${staged.length} file${staged.length > 1 ? 's' : ''} uploaded to ${code}.`);
    setStaged([]);
    router.refresh();
  }

  return (
    <>
      <div style={{ marginBottom: 20, maxWidth: 580 }}>
        <label className="field-label" htmlFor="u-project">Project</label>
        <select id="u-project" className="input" value={projectId} onChange={(e) => setProjectId(Number(e.target.value))}>
          {projects.map((p) => <option key={p.id} value={p.id}>{p.code} — {p.title}</option>)}
        </select>
      </div>
      <div
        className={`dropzone${dragging ? ' dragging' : ''}`}
        role="button" tabIndex={0}
        onClick={() => input.current?.click()}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.current?.click(); } }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); add(Array.from(e.dataTransfer.files)); }}
      >
        <div className="dropzone-icon"><Icon name="upload" size={22} color="var(--blue)" /></div>
        <div className="dropzone-title">Drop files here</div>
        <div className="muted" style={{ fontSize: 14, marginBottom: 10 }}>or click to browse your computer</div>
        <span className="muted" style={{ fontSize: 12 }}>PDF, DOCX, CSV, XLSX, TIFF, images, ZIP · max 50 MB per file</span>
        <input ref={input} type="file" multiple accept={ACCEPT} hidden onChange={(e) => { add(Array.from(e.target.files ?? [])); e.target.value = ''; }} />
      </div>

      {staged.length > 0 && (
        <div className="list-card">
          {staged.map((f, i) => (
            <div key={`${f.name}-${i}`} className="list-row">
              <Icon name="file" size={15} color="var(--blue)" />
              <span className="file-name">{f.name}</span>
              <span className="file-meta">{formatBytes(f.size)}</span>
              <button type="button" className="icon-btn danger" aria-label={`Remove ${f.name}`} onClick={() => setStaged((s) => s.filter((_, j) => j !== i))}>
                <Icon name="x" size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
      {error && <div className="alert-error" role="alert" style={{ marginBottom: 16 }}>{error}</div>}
      {notice && <div role="status" style={{ fontSize: 14, fontWeight: 600, color: 'var(--green)', marginBottom: 16 }}>✓ {notice}</div>}
      {staged.length > 0 && (
        <Button onClick={upload} disabled={busy}>
          {busy ? 'Uploading…' : `Upload ${staged.length} file${staged.length > 1 ? 's' : ''}`}
        </Button>
      )}

      <h2 className="p-h2" style={{ marginTop: 40 }}>Your uploaded files</h2>
      <FileList
        files={uploaded.map((f) => ({ ...f, canDelete: true, uploader: f.projectCode }))}
        emptyText="You haven't uploaded any files yet."
      />
    </>
  );
}
