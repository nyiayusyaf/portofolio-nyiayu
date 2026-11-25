import type { KeyboardEvent, ReactNode } from "react";
import type { SectionId } from "../data/portfolio";

type Box = { x: number; y: number; w: number; h: number };

type Props = {
  id: SectionId;
  label: string;
  box: Box; // area klik + ring hover, dalam koordinat viewBox 1600x900
  labelBelow?: boolean;
  onOpen: (id: SectionId) => void;
  children: ReactNode;
};

// Objek di scene yang bisa diklik. Ikut gerak bareng layer-nya.
export default function Hotspot({ id, label, box, labelBelow, onOpen, children }: Props) {
  const onKey = (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(id);
    }
  };

  const labelW = label.length * 11 + 40;
  const lx = box.x + box.w / 2;
  const ly = labelBelow ? box.y + box.h + 34 : box.y - 18;

  return (
    <g
      className="hotspot"
      data-section={id}
      role="button"
      tabIndex={0}
      aria-label={`Open ${label}`}
      onClick={() => onOpen(id)}
      onKeyDown={onKey}
    >
      <rect className="hs-ring" x={box.x} y={box.y} width={box.w} height={box.h} rx={16} />
      {children}
      <rect className="hs-hit" x={box.x} y={box.y} width={box.w} height={box.h} />
      <g className="hs-label" transform={`translate(${lx} ${ly})`}>
        <rect x={-labelW / 2} y={-22} width={labelW} height={36} rx={18} />
        <text y={2} textAnchor="middle">
          {label}
        </text>
      </g>
    </g>
  );
}
