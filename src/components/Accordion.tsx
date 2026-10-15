'use client';

import { useEffect, useState } from 'react';
import { Icon } from './Icon';

/** Dark homepage accordion: numbered rows, one open at a time. */
export function DarkAccordion({ items }: { items: { t: string; d: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div>
      {items.map((s, i) => {
        const isOpen = open === i;
        return (
          <div key={s.t} className={`acc-dark-item${isOpen ? ' open' : ''}`}>
            <button className="acc-dark-btn" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
              <span style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
                <span className="acc-num">0{i + 1}</span>
                <span className="acc-dark-title">{s.t}</span>
              </span>
              <Icon name={isOpen ? 'chevronUp' : 'chevronDown'} size={16} color="var(--blue-dark)" />
            </button>
            {isOpen && <p className="acc-dark-body">{s.d}</p>}
          </div>
        );
      })}
    </div>
  );
}

type Service = { slug: string; t: string; d: string; methods: string[] };

/** Services page accordion. Opens the item named in the URL hash (e.g. /services#training). */
export function ServicesAccordion({ items }: { items: Service[] }) {
  const [open, setOpen] = useState(0);

  useEffect(() => {
    function fromHash() {
      const i = items.findIndex((s) => s.slug === window.location.hash.slice(1));
      if (i >= 0) {
        setOpen(i);
        document.getElementById(items[i].slug)?.scrollIntoView({ block: 'start' });
      }
    }
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [items]);

  return (
    <div>
      {items.map((s, i) => {
        const isOpen = open === i;
        return (
          <div key={s.slug} id={s.slug} className="acc-item" style={{ scrollMarginTop: 60 }}>
            <button className="acc-btn" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
              <span className="acc-num" style={{ fontWeight: 600 }}>0{i + 1}</span>
              <span className="acc-title">{s.t}</span>
              <Icon name={isOpen ? 'chevronUp' : 'chevronDown'} size={20} color="var(--blue)" />
            </button>
            {isOpen && (
              <div className="acc-body">
                <p className="body" style={{ textWrap: 'pretty' }}>{s.d}</p>
                <div>
                  <div className="label-caps">Methods offered</div>
                  <ul className="check-list">
                    {s.methods.map((m) => (
                      <li key={m}><Icon name="check" size={14} color="var(--blue)" /><span>{m}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
