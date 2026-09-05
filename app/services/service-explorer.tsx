"use client";

import { useRef, useState } from "react";
import Link from "next/link";

type Pathway = { readonly no: string; readonly id: string; readonly title: string; readonly question: string; readonly copy: string; readonly hero: string };

export function ServiceExplorer({ pathways }: { pathways: readonly Pathway[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function choose(index: number, focus = false) {
    setActive(index);
    if (focus) tabs.current[index]?.focus();
  }
  return <section className="astra-explorer" aria-labelledby="services-title">
    <div className="astra-explorer-intro">
      <p className="astra-label">One studio. Every dimension.</p>
      <h1 id="services-title">From first idea<br/>to <em>something real.</em></h1>
      <p className="astra-explorer-lead">Architecture, BIM and visualization.<br/>Find the right starting point for your project.</p>
      <div className="astra-tabs" role="tablist" aria-label="Explore service pathways">
        {pathways.map((path, index) => <button key={path.id} ref={el => { tabs.current[index] = el; }} id={`path-tab-${path.id}`} role="tab" aria-selected={active === index} aria-controls={`path-panel-${path.id}`} tabIndex={active === index ? 0 : -1} onClick={() => choose(index)} onKeyDown={event => {
          let next = active;
          if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (active + 1) % pathways.length;
          else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (active + pathways.length - 1) % pathways.length;
          else if (event.key === "Home") next = 0;
          else if (event.key === "End") next = pathways.length - 1;
          else return;
          event.preventDefault(); choose(next, true);
        }}><span className="astra-tab-no">{path.no}</span><span><strong>{path.title}</strong><small>{path.question}</small></span><span className="astra-tab-arrow" aria-hidden="true">↗</span></button>)}
      </div>
      <Link className="astra-text-link" href="/contact">Not sure where to start? Talk to the studio <span aria-hidden="true">↗</span></Link>
    </div>
    <div className="astra-explorer-stage">
      {pathways.map((path, index) => <div key={path.id} id={`path-panel-${path.id}`} role="tabpanel" tabIndex={0} aria-labelledby={`path-tab-${path.id}`} hidden={index !== active} className={`astra-panel astra-panel-${path.id}`}>
        <img src={path.hero} alt={index === 0 ? "Residential exterior design with warm materials and landscaped surroundings" : index === 1 ? "Color-coded Revit building services coordination model" : "Architectural real-time environment from the Artimist visual library"} width="1200" height="1400" loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} decoding="async"/>
        <div className="astra-panel-note"><span>{path.no} / {index === 0 ? "Shape the space" : index === 1 ? "Resolve the detail" : "Bring it to life"}</span><span>Artimist Productions</span></div>
        <div className="astra-panel-caption"><p>{path.copy}</p><a href={`#${path.id}`}>Explore {path.title.toLowerCase()} <span aria-hidden="true">↗</span></a></div>
      </div>)}
    </div>
  </section>;
}
