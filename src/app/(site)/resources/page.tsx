import type { Metadata } from 'next';
import { ButtonLink, Eyebrow } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { PUBLICATIONS, TOOLS } from '@/lib/content';

export const metadata: Metadata = { title: 'Resources' };

export default function ResourcesPage() {
  const years = [...new Set(PUBLICATIONS.map((p) => p.year))].sort((a, b) => b - a);
  return (
    <section className="tile s-light">
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="center" style={{ marginBottom: 64 }}>
          <Eyebrow text="Resources" />
          <h1 className="display h-page" style={{ margin: '0 0 16px' }}>Tools &amp; peer-reviewed science.</h1>
          <p className="lead" style={{ maxWidth: 460, margin: '0 auto' }}>Open-access tools developed by our team, and CORE EV related publications.</p>
        </div>

        <div className="grid-2" style={{ marginBottom: 72 }}>
          {TOOLS.map((t) => (
            <div key={t.id} className="tool-card">
              <img src={t.logo} alt={`${t.name} logo`} className="tool-logo" width={t.logoW} height={t.logoH} style={{ height: t.logoBox }} />
              <div>
                <h2 className="tool-name">{t.name}</h2>
                <p className="tool-tagline">{t.tagline}</p>
                <p className="tool-desc">{t.desc}</p>
              </div>
              <div>
                <ButtonLink href={t.url} external size="sm">
                  Visit {t.name} <Icon name="externalLink" size={13} color="#fff" />
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>

        <div id="publications" style={{ scrollMarginTop: 60 }}>
          {years.map((y) => (
            <div key={y} style={{ marginBottom: 56 }}>
              <h2 className="pub-year">{y}</h2>
              <div className="stack" style={{ gap: 18 }}>
                {PUBLICATIONS.filter((p) => p.year === y).map((p) => (
                  <article key={p.doi} className="pub">
                    <h3>{p.title}</h3>
                    <p className="pub-authors">{p.authors}</p>
                    <p className="pub-journal">{p.journal}</p>
                    <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer" className="pub-doi">
                      doi: {p.doi} <Icon name="externalLink" size={11} color="var(--blue)" />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
