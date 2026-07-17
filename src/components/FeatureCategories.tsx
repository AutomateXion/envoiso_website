import { useState } from 'react';
import { Check, Plus, Sparkle } from './Icons';
import { FEATURE_CATEGORIES } from '../data/featureCategories';

export default function FeatureCategories() {
  const [open, setOpen] = useState<number | null>(null);
  const highlights = FEATURE_CATEGORIES.filter(c => c.highlight);

  return (
    <>
      <div className="highlight-strip">
        {highlights.map(h => (
          <div className="highlight-card" key={h.title}>
            <div className="highlight-ico"><Sparkle /></div>
            <h3>{h.title}</h3>
            <p>{h.highlightNote}</p>
          </div>
        ))}
      </div>

      <div className="cat-list">
        {FEATURE_CATEGORIES.map((c, i) => (
          <div className={'cat-item' + (open === i ? ' open' : '')} key={c.title}>
            <button className="cat-q" onClick={() => setOpen(open === i ? null : i)}>
              <span>
                <span className="cat-title">{c.title}</span>
                {c.highlight && <span className="cat-badge">Included, no extra cost</span>}
                <span className="cat-blurb">{c.blurb}</span>
              </span>
              <Plus />
            </button>
            {open === i && (
              <div className="cat-a">
                <ul>
                  {c.features.map(f => (
                    <li key={f}><Check />{f}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
