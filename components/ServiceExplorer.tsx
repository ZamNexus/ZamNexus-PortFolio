"use client";

import { useState } from "react";
import ServiceDiagram from "@/components/ServiceDiagram";
import { services } from "@/lib/catalog";

// The services page's centrepiece: choose a service and its diagram draws itself beside a plain
// summary. Until someone chooses, it moves through the services on its own; the progress line on
// the current tab is the timer (its animationend advances), so hovering pauses it and reduced
// motion, which removes the animation, stops it. Every service is a real button and a link to its section.
export default function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const service = services[active];

  const choose = (i: number) => {
    setActive(i);
    setTouched(true);
  };

  return (
    <div className="explorer explorer--services" data-auto={!touched}>
      <div className="explorer__head" aria-hidden="true">
        <span>Choose a service to see how it works</span>
        <span className="explorer__count">
          <b>{String(active + 1).padStart(2, "0")}</b> / {String(services.length).padStart(2, "0")}
        </span>
      </div>
      <div role="tablist" aria-label="Services" className="explorer__tabs">
        {services.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            id={`explorer-tab-${s.id}`}
            aria-selected={i === active}
            data-past={i < active}
            aria-controls="explorer-panel"
            onClick={() => choose(i)}
            className="explorer__tab"
          >
            <span className="explorer__tab-index" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="explorer__tab-name">{s.label}</span>
            <span className="explorer__tab-short">{s.short}</span>
            {i === active && !touched ? (
              <span
                className="explorer__timer"
                aria-hidden="true"
                onAnimationEnd={() => setActive((active + 1) % services.length)}
              />
            ) : null}
          </button>
        ))}
      </div>

      <div id="explorer-panel" role="tabpanel" aria-labelledby={`explorer-tab-${service.id}`} className="explorer__panel">
        {/* Keyed, so each change replays the draw-in */}
        <div key={service.id} className="explorer__stage explorer__stage--service dg-play">
          <div className="explorer__diagram">
            <div className="explorer__chrome" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>{service.id}.diagram</span>
              <em>live</em>
            </div>
            <ServiceDiagram id={service.id} instance="explorer" />
          </div>
          <div className="explorer__copy">
            <span className="explorer__index" aria-hidden="true">
              {String(active + 1).padStart(2, "0")}
            </span>
            <h3 className="explorer__title">{service.label}</h3>
            <p className="explorer__short">{service.short}</p>
            <p className="explorer__outcome">{service.outcome}</p>
            <ul className="explorer__list" aria-label="Typically includes">
              {service.deliverables.slice(0, 3).map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <a href={`#${service.id}`} className="explorer__more">
              What you get with {service.label}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
