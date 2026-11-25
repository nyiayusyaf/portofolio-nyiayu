// Scene office dipecah jadi 5 layer SVG (jauh -> dekat).
// Semua pakai viewBox 1600x900 yang sama supaya posisinya pas saat diam.
import type { ReactNode } from "react";
import Hotspot from "./Hotspot";
import { projects, type SectionId } from "../data/portfolio";

// Tinggi 1100 (y -100..1000): layar sempit crop plafon/lantai, bukan objek penting.
const VB = "0 -100 1600 1100";

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice">
      {children}
    </svg>
  );
}

type OpenProps = { onOpen: (id: SectionId) => void };

/* ---------- 1. Langit + kota di luar jendela ---------- */
export function SkyLayer() {
  const far = [
    [470, 300, 90], [580, 230, 70], [690, 330, 110], [830, 260, 80], [960, 200, 84],
    [1080, 280, 110], [1220, 240, 90], [1340, 300, 70], [1420, 220, 90],
  ];
  const near = [
    [520, 400, 64], [760, 380, 80], [900, 350, 92], [1160, 390, 70], [1300, 360, 84],
  ];
  return (
    <Svg>
      <defs>
        <linearGradient id="sky-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdfbff" />
          <stop offset="1" stopColor="#e4dbfb" />
        </linearGradient>
      </defs>
      <rect y="-100" width="1600" height="1100" fill="url(#sky-g)" />
      <circle cx="1180" cy="170" r="230" fill="#fff" opacity="0.55" />
      <g className="cloud cloud-a" fill="#fff" opacity="0.8">
        <ellipse cx="700" cy="130" rx="90" ry="22" />
        <ellipse cx="750" cy="115" rx="50" ry="22" />
      </g>
      <g className="cloud cloud-b" fill="#fff" opacity="0.7">
        <ellipse cx="1250" cy="90" rx="110" ry="20" />
        <ellipse cx="1210" cy="78" rx="46" ry="18" />
      </g>
      <g fill="#e2dbf8">
        {far.map(([x, top, w]) => (
          <rect key={`f${x}`} x={x} y={top} width={w} height={700 - top} />
        ))}
        <polygon points="960,200 1002,140 1044,200" />
      </g>
      <g fill="#d3c9f3">
        {near.map(([x, top, w]) => (
          <rect key={`n${x}`} x={x} y={top} width={w} height={700 - top} />
        ))}
      </g>
      <g fill="#fff" opacity="0.45">
        {near.flatMap(([x, top, w]) =>
          [0, 1, 2, 3, 4].map((r) => (
            <rect key={`w${x}-${r}`} x={x + 12} y={top + 20 + r * 34} width={w - 24} height={6} />
          )),
        )}
      </g>
    </Svg>
  );
}

/* ---------- 2. Pohon low-poly ---------- */
export function TreeLayer() {
  return (
    <Svg>
      <g className="tree-sway">
        <path d="M498 640 L516 430 L466 330 L522 370 L556 300 L574 386 L646 326 L592 424 L590 640 Z" fill="#7d4f3b" />
        <path d="M546 640 L552 430 L590 640 Z" fill="#673f30" />
        <path d="M574 386 L706 300 L712 316 L590 402 Z" fill="#7d4f3b" />
        <path d="M474 92 L744 78 L770 262 L706 346 L560 362 L462 300 Z" fill="#9c9a3c" />
        <path d="M474 92 L744 78 L640 204 Z" fill="#acab4c" />
        <path d="M744 78 L770 262 L640 204 Z" fill="#94922f" />
        <path d="M640 204 L770 262 L706 346 Z" fill="#878528" />
        <path d="M462 300 L560 362 L592 250 Z" fill="#8f8d33" />
        <path d="M474 92 L592 250 L462 300 Z" fill="#a4a243" />
        <path d="M592 250 L640 204 L706 346 L560 362 Z" fill="#9a9838" />
      </g>
    </Svg>
  );
}

/* ---------- 3. Ruangan: tembok, jendela, lantai, jam, papan ---------- */
export function RoomLayer({ onOpen, now }: OpenProps & { now: Date }) {
  const min = now.getMinutes() * 6 + now.getSeconds() * 0.1;
  const hour = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5;
  const rows = projects.slice(0, 4);

  return (
    <Svg>
      <defs>
        <linearGradient id="floor-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b3a9e2" />
          <stop offset="1" stopColor="#968acb" />
        </linearGradient>
      </defs>

      {/* tembok dengan lubang jendela */}
      <path fillRule="evenodd" d="M0 -100H1600V660H0Z M452 60H1488V590H452Z" fill="#c9c2f3" />
      <rect x="0" y="-100" width="1600" height="124" fill="#ddd8fa" />
      <rect x="40" y="-100" width="376" height="760" fill="#d6d0f8" />
      <rect x="416" y="-100" width="18" height="760" fill="#bcb3ee" />
      <rect x="1520" y="-100" width="80" height="760" fill="#bfb7ef" />

      {/* kaca + kusen */}
      <g fill="#fff" opacity="0.16">
        <polygon points="800,60 900,60 640,590 540,590" />
        <polygon points="1140,60 1190,60 930,590 880,590" />
      </g>
      <g fill="#d9a7aa">
        {[696, 988, 1268].map((x) => (
          <rect key={x} x={x} y="60" width="14" height="530" />
        ))}
      </g>
      <g fill="#e6b9bb">
        {[228, 408].map((y) => (
          <rect key={y} x="452" y={y} width="1036" height="12" />
        ))}
      </g>
      <rect x="452" y="60" width="1036" height="530" fill="none" stroke="#c48f96" strokeWidth="18" />
      <rect x="440" y="586" width="1060" height="16" rx="3" fill="#e9e5ff" />
      <rect x="440" y="600" width="1060" height="6" fill="#b4abe6" />

      {/* lantai */}
      <rect x="0" y="640" width="1600" height="360" fill="url(#floor-g)" />
      <rect x="0" y="628" width="1600" height="14" fill="#bdb5ec" />
      <polygon points="452,642 1488,642 1600,800 330,800" fill="#fff" opacity="0.1" />

      {/* jam + papan digeser dikit ke kanan biar aman di layar 4:3 */}
      <g transform="translate(20 0)">
      {/* jam dinding -> Pengalaman */}
      <Hotspot id="experience" label="Experience" box={{ x: 164, y: 36, w: 128, h: 128 }} onOpen={onOpen}>
        <circle cx="228" cy="100" r="58" fill="#c3bce6" />
        <circle cx="228" cy="100" r="50" fill="#f8f6ff" />
        <g className="chalk" fill="#5a3a8a" fontSize="20" textAnchor="middle">
          <text x="228" y="70">12</text>
          <text x="266" y="107">3</text>
          <text x="228" y="144">6</text>
          <text x="190" y="107">9</text>
        </g>
        <line x1="228" y1="100" x2="228" y2="74" stroke="#5a3a8a" strokeWidth="6" strokeLinecap="round"
          transform={`rotate(${hour} 228 100)`} />
        <line x1="228" y1="100" x2="228" y2="62" stroke="#7b5cc4" strokeWidth="4" strokeLinecap="round"
          transform={`rotate(${min} 228 100)`} />
        <circle cx="228" cy="100" r="5" fill="#5a3a8a" />
      </Hotspot>

      {/* papan tugas -> Proyek */}
      <Hotspot id="projects" label="Projects" box={{ x: 68, y: 182, w: 320, h: 416 }} labelBelow onOpen={onOpen}>
        <rect x="76" y="190" width="304" height="400" rx="6" fill="#3b2149" stroke="#2c1838" strokeWidth="6" />
        <g fill="#fff" opacity="0.05">
          <circle cx="150" cy="420" r="40" />
          <circle cx="300" cy="300" r="60" />
          <circle cx="260" cy="520" r="30" />
        </g>
        <text className="chalk" x="112" y="248" fontSize="44" fill="#fbf6ff">PROJECTS /</text>
        <path d="M108 262 Q200 256 300 262" stroke="#cdb8e0" strokeWidth="3" fill="none" />
        <line x1="336" y1="280" x2="336" y2="566" stroke="#6e4e80" strokeWidth="3" />
        {rows.map((p, i) => {
          const y = 296 + i * 70;
          return (
            <g key={p.title}>
              <rect x="100" y={y} width="32" height="32" rx="3" fill={p.color}
                transform={`rotate(${i % 2 ? 4 : -3} 116 ${y + 16})`} />
              <text className="chalk" x="146" y={y + 26} fontSize="25" fill="#efe6fb">
                {p.title.length > 15 ? p.title.slice(0, 14) + "…" : p.title}
              </text>
              <path d={`M344 ${y + 16} l7 8 l14 -18`} stroke="#bfe8b0" strokeWidth="3" fill="none" strokeLinecap="round" />
              {i < rows.length - 1 && (
                <line x1="92" y1={y + 52} x2="366" y2={y + 50} stroke="#6e4e80" strokeWidth="2" />
              )}
            </g>
          );
        })}
      </Hotspot>
      </g>
    </Svg>
  );
}

/* ---------- 4. Meja, monitor, kursi, rak ---------- */
export function DeskLayer({ onOpen, now }: OpenProps & { now: Date }) {
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });

  return (
    <Svg>
      <defs>
        <linearGradient id="cushion-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8a6dff" />
          <stop offset="1" stopColor="#4b33c9" />
        </linearGradient>
        <linearGradient id="screen-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#56407a" />
          <stop offset="1" stopColor="#3d2b58" />
        </linearGradient>
      </defs>

      {/* bayangan lantai */}
      <g fill="#2a1d4a" opacity="0.1">
        <ellipse cx="504" cy="676" rx="84" ry="10" />
        <ellipse cx="716" cy="718" rx="124" ry="12" />
        <ellipse cx="1040" cy="722" rx="250" ry="14" />
        <ellipse cx="1298" cy="694" rx="110" ry="10" />
      </g>

      {/* pouf belakang */}
      <rect x="436" y="572" width="136" height="94" rx="18" fill="#5a48e6" />
      <rect x="436" y="556" width="136" height="42" rx="16" fill="#7466ff" />
      <rect x="440" y="652" width="128" height="14" rx="6" fill="#ff6b2c" />

      {/* laci -> Kontak */}
      <Hotspot id="contact" label="Contact" box={{ x: 596, y: 516, w: 240, h: 210 }} labelBelow onOpen={onOpen}>
        <rect x="612" y="544" width="208" height="170" fill="#f5f3ff" />
        <rect x="612" y="544" width="16" height="170" fill="#ddd8f5" />
        <rect x="642" y="640" width="164" height="64" rx="4" fill="#fbfaff" stroke="#d7d1f2" strokeWidth="2" />
        <path d="M706 652 h36 l-6 8 h-24 z" fill="#5b3a3f" />
        {/* laci atas sedikit kebuka pas hover */}
        <rect x="642" y="560" width="164" height="70" rx="4" fill="#3b2b4f" opacity="0.25" />
        <g className="drawer-top">
          <rect x="642" y="560" width="164" height="70" rx="4" fill="#fbfaff" stroke="#d7d1f2" strokeWidth="2" />
          <path d="M706 574 h36 l-6 8 h-24 z" fill="#5b3a3f" />
        </g>
        <rect x="620" y="712" width="20" height="8" fill="#5b3a3f" />
        <rect x="794" y="712" width="20" height="8" fill="#5b3a3f" />
        <rect x="600" y="520" width="232" height="22" rx="4" fill="#ff7a1a" />
        <rect x="600" y="536" width="232" height="8" fill="#e2600c" />
      </Hotspot>

      {/* kipas */}
      <ellipse cx="716" cy="518" rx="38" ry="8" fill="#eeebff" />
      <rect x="710" y="470" width="12" height="48" fill="#e5e1fb" />
      <g transform="translate(716 452)">
        <circle r="46" fill="#fff" opacity="0.35" />
        <g className="fan-blades">
          {[0, 120, 240].map((a) => (
            <ellipse key={a} cx="0" cy="-20" rx="13" ry="22" fill="#ffd23f" transform={`rotate(${a})`} />
          ))}
        </g>
        <circle r="9" fill="#8a7bd6" />
        <circle r="46" fill="none" stroke="#cfc9ee" strokeWidth="3" />
        <g stroke="#cfc9ee" strokeWidth="1.5" opacity="0.8">
          <line x1="-46" y1="0" x2="46" y2="0" />
          <line x1="0" y1="-46" x2="0" y2="46" />
          <line x1="-32" y1="-32" x2="32" y2="32" />
          <line x1="32" y1="-32" x2="-32" y2="32" />
        </g>
      </g>

      {/* meja */}
      <rect x="884" y="506" width="312" height="120" fill="#e7e3fb" />
      <rect x="818" y="506" width="66" height="214" fill="#f5f3ff" />
      <rect x="818" y="506" width="12" height="214" fill="#dcd6f6" />
      <rect x="1196" y="506" width="66" height="214" fill="#f5f3ff" />
      <rect x="806" y="476" width="472" height="24" rx="4" fill="#ff8a1f" />
      <rect x="806" y="494" width="472" height="12" fill="#e8650f" />

      {/* buku di meja */}
      <rect x="842" y="462" width="74" height="14" rx="2" fill="#c43149" />
      <rect x="846" y="450" width="70" height="13" rx="2" fill="#f06d86" />
      <rect x="840" y="438" width="72" height="13" rx="2" fill="#e63f5a" />

      {/* monitor -> Tentang */}
      <Hotspot id="about" label="About" box={{ x: 892, y: 320, w: 206, h: 164 }} onOpen={onOpen}>
        <path d="M958 478 h74 l-8 -8 h-58 z" fill="#3b2b4f" />
        <rect x="988" y="444" width="14" height="30" fill="#3b2b4f" />
        <rect x="900" y="330" width="190" height="120" rx="8" fill="#2f2240" />
        <rect x="908" y="338" width="174" height="104" rx="4" fill="url(#screen-g)" />
        <polygon points="1010,338 1082,338 1082,410" fill="#fff" opacity="0.07" />
        <text className="screen-time" x="995" y="405" textAnchor="middle">{time}</text>
      </Hotspot>

      {/* rak buku -> Skill */}
      <Hotspot id="skills" label="Skills" box={{ x: 1188, y: 284, w: 220, h: 414 }} onOpen={onOpen}>
        <g className="plant-sway">
          {[
            ["#7fae2e", "M1262 356 L1250 296 L1272 352"],
            ["#9bc744", "M1278 356 L1280 286 L1292 354"],
            ["#86b832", "M1296 356 L1318 300 L1306 356"],
            ["#9bc744", "M1312 356 L1344 312 L1322 358"],
            ["#7fae2e", "M1250 358 L1226 318 L1262 356"],
            ["#a8d050", "M1286 356 L1300 292 L1300 356"],
            ["#86b832", "M1326 358 L1356 330 L1334 360"],
          ].map(([c, d]) => (
            <path key={d} d={d} fill={c} />
          ))}
        </g>
        <path d="M1234 352 H1358 L1348 394 H1244 Z" fill="#fbfaff" />
        <path d="M1330 352 H1358 L1348 394 H1326 Z" fill="#e4dff9" />
        <rect x="1200" y="392" width="196" height="300" fill="#f6f4ff" />
        <rect x="1376" y="392" width="20" height="300" fill="#dcd6f5" />
        {[404, 484, 564, 634].map((y, i) => (
          <rect key={y} x="1214" y={y} width="160" height={i === 3 ? 50 : 66} fill="#e4dff9" />
        ))}
        {/* rak 1: buku berdiri */}
        <rect x="1226" y="410" width="16" height="60" fill="#e23d5b" />
        <rect x="1244" y="416" width="14" height="54" fill="#7b3fe4" />
        <rect x="1260" y="412" width="16" height="58" fill="#5a2bb8" />
        <polygon points="1280,470 1294,470 1318,420 1304,416" fill="#ff7a1a" />
        {/* rak 2: binder */}
        <rect x="1232" y="526" width="68" height="24" rx="3" fill="#6c5ce7" />
        <circle cx="1252" cy="538" r="4" fill="#d7d1ff" />
        <circle cx="1270" cy="538" r="4" fill="#d7d1ff" />
        {/* rak 3: tanaman kecil */}
        <rect x="1250" y="604" width="30" height="24" rx="3" fill="#fff" />
        <path d="M1258 604 L1250 578 L1266 602 M1268 604 L1276 574 L1274 604" fill="#8fbf3a" stroke="#8fbf3a" strokeWidth="5" strokeLinejoin="round" />
        {/* rak 4: buku */}
        <rect x="1226" y="644" width="18" height="40" fill="#ff7a1a" />
        <rect x="1246" y="640" width="14" height="44" fill="#2aa7a0" />
        <rect x="1262" y="646" width="12" height="38" fill="#e23d5b" />
      </Hotspot>

      {/* kursi */}
      <g stroke="#3b2b4f" strokeWidth="10" strokeLinecap="round">
        <line x1="1180" y1="700" x2="1112" y2="726" />
        <line x1="1180" y1="700" x2="1250" y2="724" />
        <line x1="1180" y1="700" x2="1150" y2="742" />
        <line x1="1180" y1="700" x2="1222" y2="746" />
      </g>
      <g fill="#241a33">
        <circle cx="1112" cy="732" r="8" />
        <circle cx="1250" cy="730" r="8" />
        <circle cx="1150" cy="748" r="8" />
        <circle cx="1222" cy="752" r="8" />
      </g>
      <rect x="1173" y="610" width="14" height="92" fill="#3b2b4f" />
      <path d="M1060 588 L1222 588 L1238 618 L1076 618 Z" fill="#3b2b4f" />
      <path d="M1196 590 L1206 560 L1220 560 L1212 594 Z" fill="#3b2b4f" />
      <rect x="1132" y="408" width="132" height="198" rx="36" fill="#3b2b4f" />
      <rect x="1144" y="420" width="108" height="168" rx="28" fill="url(#cushion-g)" />
      <path d="M1160 430 Q1200 422 1240 434 L1236 470 Q1200 460 1160 466 Z" fill="#fff" opacity="0.12" />
    </Svg>
  );
}

/* ---------- 5. Foreground: pouf, tong sampah, tanaman besar ---------- */
export function FrontLayer() {
  return (
    <Svg>
      <defs>
        <linearGradient id="bin-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5a4672" />
          <stop offset="1" stopColor="#2d2140" />
        </linearGradient>
      </defs>
      <g fill="#2a1d4a" opacity="0.12">
        <ellipse cx="240" cy="752" rx="104" ry="12" />
        <ellipse cx="1478" cy="690" rx="66" ry="8" />
      </g>

      {/* pouf depan */}
      <rect x="156" y="632" width="168" height="114" rx="22" fill="#5a48e6" />
      <rect x="156" y="612" width="168" height="52" rx="20" fill="#7466ff" />
      <path d="M168 624 Q240 612 312 626" stroke="#fff" strokeOpacity="0.2" strokeWidth="6" fill="none" strokeLinecap="round" />
      <rect x="160" y="728" width="160" height="18" rx="8" fill="#ff6b2c" />

      {/* tong sampah */}
      <path d="M1424 562 L1532 562 L1518 690 L1438 690 Z" fill="url(#bin-g)" />
      <ellipse cx="1478" cy="562" rx="54" ry="9" fill="#6a5688" />
      <ellipse cx="1478" cy="563" rx="46" ry="6" fill="#241a33" />

      {/* tanaman besar di pojok, sengaja kepotong biar ada kedalaman */}
      <g className="plant-sway-big">
        <path d="M1600 1000 L1520 640 Q1560 700 1600 720 Z" fill="#4f7d1f" />
        <path d="M1600 1000 L1450 700 Q1540 720 1600 800 Z" fill="#6b9a2a" />
        <path d="M1600 1000 L1560 600 Q1600 640 1600 700 Z" fill="#5d8c24" />
        <path d="M1600 1000 L1420 800 Q1520 790 1600 850 Z" fill="#7fae2e" />
      </g>
    </Svg>
  );
}
