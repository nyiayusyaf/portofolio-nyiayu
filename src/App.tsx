import { useEffect, useState } from "react";
import Scene from "./components/Scene";
import Panel from "./components/Panel";
import { profile, sections, type SectionId } from "./data/portfolio";
import "./App.css";

function useNow(intervalMs = 10_000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

export default function App() {
  const [active, setActive] = useState<SectionId | null>(null);
  const now = useNow();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="app">
      <Scene active={active} now={now} onOpen={setActive} onClose={() => setActive(null)} />

      <header className="topbar">
        <button className="brand" onClick={() => setActive(null)}>
          <strong>{profile.name}</strong>
          <span>{profile.role}</span>
        </button>
        <nav aria-label="Main">
          {sections.map((s) => (
            <button
              key={s.id}
              className="nav-btn"
              aria-current={active === s.id ? "true" : undefined}
              onClick={() => setActive(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>
        <a className="cv-btn" href={profile.cvUrl} download>
          CV ↓
        </a>
      </header>

      <p className={`hint${active ? " is-hidden" : ""}`}>
        Move your mouse to look around · click things in the room
      </p>

      <Panel active={active} onClose={() => setActive(null)} onNavigate={setActive} />
    </main>
  );
}
