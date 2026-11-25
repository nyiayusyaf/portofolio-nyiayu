import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import gsap from "gsap";
import { SkyLayer, TreeLayer, RoomLayer, DeskLayer, FrontLayer } from "./layers";
import type { SectionId } from "../data/portfolio";

type Props = {
  active: SectionId | null;
  now: Date;
  onOpen: (id: SectionId) => void;
  onClose: () => void;
};

// Gerak maksimal layer (px) saat depth = 1.
const RANGE_X = 70;
const RANGE_Y = 36;
const ZOOM = 1.55;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Layer({ depth, children }: { depth: number; children: ReactNode }) {
  return (
    <div className="layer" data-depth={depth}>
      {children}
    </div>
  );
}

export default function Scene({ active, now, onOpen, onClose }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const camRef = useRef<HTMLDivElement>(null);

  // Intro + parallax ikut mouse/jari.
  useEffect(() => {
    const stage = stageRef.current!;
    const layers = Array.from(stage.querySelectorAll<HTMLElement>("[data-depth]"));
    const reduced = reducedMotion();

    const ctx = gsap.context(() => {
      gsap.set(camRef.current, { transformOrigin: "0 0" });
      if (!reduced) {
        gsap.from(layers, { yPercent: 5, opacity: 0, duration: 1.2, stagger: 0.12, ease: "power3.out" });
      }
    }, stage);

    if (reduced) return () => ctx.revert();

    const movers = layers.map((el) => ({
      depth: Number(el.dataset.depth),
      x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" }),
      y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" }),
    }));

    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      for (const m of movers) {
        m.x(-nx * RANGE_X * m.depth);
        m.y(-ny * RANGE_Y * m.depth);
      }
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, []);

  // Kamera zoom ke objek yang dibuka.
  useEffect(() => {
    const cam = camRef.current!;
    const duration = reducedMotion() ? 0 : 1.1;

    const focus = () => {
      const target = active && cam.querySelector(`[data-section="${active}"] .hs-hit`);
      if (!target) {
        gsap.to(cam, { x: 0, y: 0, scale: 1, duration, ease: "power3.inOut" });
        return;
      }
      const W = window.innerWidth;
      const H = window.innerHeight;
      const s0 = Number(gsap.getProperty(cam, "scale"));
      const x0 = Number(gsap.getProperty(cam, "x"));
      const y0 = Number(gsap.getProperty(cam, "y"));
      const r = target.getBoundingClientRect();
      // titik tengah objek dalam koordinat kamera belum di-zoom
      const cx = (r.left + r.width / 2 - x0) / s0;
      const cy = (r.top + r.height / 2 - y0) / s0;

      const wide = W > 760;
      const panelW = wide ? Math.min(460, W * 0.42) : 0;
      const goalX = wide ? (W - panelW) / 2 : W / 2;
      const goalY = wide ? H / 2 : H * 0.28;

      const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
      gsap.to(cam, {
        x: clamp(goalX - cx * ZOOM, W - W * ZOOM, 0),
        y: clamp(goalY - cy * ZOOM, H - H * ZOOM, 0),
        scale: ZOOM,
        duration,
        ease: "power3.inOut",
      });
    };

    focus();
    window.addEventListener("resize", focus);
    return () => window.removeEventListener("resize", focus);
  }, [active]);

  // Klik area kosong = tutup panel.
  const onStageClick = (e: MouseEvent) => {
    if (active && !(e.target as Element).closest(".hotspot")) onClose();
  };

  return (
    <div className={`stage${active ? " is-zoomed" : ""}`} ref={stageRef} onClick={onStageClick}>
      <div className="camera" ref={camRef}>
        <Layer depth={0.08}><SkyLayer /></Layer>
        <Layer depth={0.2}><TreeLayer /></Layer>
        <Layer depth={0.35}><RoomLayer onOpen={onOpen} now={now} /></Layer>
        <Layer depth={0.6}><DeskLayer onOpen={onOpen} now={now} /></Layer>
        <Layer depth={1}><FrontLayer /></Layer>
      </div>
      <div className="vignette" />
    </div>
  );
}
