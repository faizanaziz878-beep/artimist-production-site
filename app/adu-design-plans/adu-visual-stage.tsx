"use client";

import Image from "next/image";
import { useRef } from "react";

export function AduVisualStage() {
  const ref = useRef<HTMLDivElement>(null);

  function move(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    el.style.setProperty("--adu-rx", `${(-y * 7).toFixed(2)}deg`);
    el.style.setProperty("--adu-ry", `${(x * 9).toFixed(2)}deg`);
    el.style.setProperty("--adu-mx", `${(x * 18).toFixed(1)}px`);
    el.style.setProperty("--adu-my", `${(y * 16).toFixed(1)}px`);
  }

  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--adu-rx", "0deg");
    el.style.setProperty("--adu-ry", "0deg");
    el.style.setProperty("--adu-mx", "0px");
    el.style.setProperty("--adu-my", "0px");
  }

  return (
    <div className="adu-stage-shell" ref={ref} onPointerMove={move} onPointerLeave={reset}>
      <div className="adu-stage-glow" />
      <div className="adu-stage">
        <figure className="adu-stage-card adu-stage-render">
          <Image src="/adu/adu-hero.svg" alt="Modern backyard ADU visualized at sunset with warm interior lighting" fill priority sizes="(max-width: 900px) 94vw, 48vw" />
        </figure>
        <figure className="adu-stage-card adu-stage-plan">
          <Image src="/adu/adu-floor-plan.svg" alt="Detached accessory dwelling unit floor plan" fill sizes="(max-width: 900px) 42vw, 18vw" />
          <figcaption>PLAN · A1.1</figcaption>
        </figure>
        <figure className="adu-stage-card adu-stage-section">
          <Image src="/adu/adu-sections.svg" alt="ADU architectural section drawing" fill sizes="(max-width: 900px) 38vw, 16vw" />
          <figcaption>SECTION · A3.1</figcaption>
        </figure>
        <div className="adu-stage-tag"><i />ADU / DESIGN → DRAWINGS → 3D</div>
      </div>
      <p className="adu-stage-hint">Move cursor · explore the design stack</p>
    </div>
  );
}
