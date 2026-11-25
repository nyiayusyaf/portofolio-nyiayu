import { useEffect, useRef } from "react";
import {
  experience,
  profile,
  projects,
  sections,
  skills,
  type SectionId,
} from "../data/portfolio";

type Props = {
  active: SectionId | null;
  onClose: () => void;
  onNavigate: (id: SectionId) => void;
};

export default function Panel({ active, onClose, onNavigate }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const label = sections.find((s) => s.id === active)?.label ?? "";
  const orgs = [...new Set(projects.map((p) => p.org))];

  useEffect(() => {
    if (active) headingRef.current?.focus({ preventScroll: true });
  }, [active]);

  return (
    <aside
      className={`panel${active ? " is-open" : ""}`}
      aria-hidden={!active}
      aria-labelledby="panel-title"
      inert={!active}
    >
      <header className="panel-head">
        <span className="panel-kicker">{label}</span>
        <button className="panel-close" onClick={onClose} aria-label="Close panel">
          ×
        </button>
      </header>

      <div className="panel-body">
        {active === "about" && (
          <>
            <h2 id="panel-title" ref={headingRef} tabIndex={-1}>
              Hi, I'm {profile.shortName}.
            </h2>
            <p className="lead">{profile.tagline}</p>
            <p>{profile.about}</p>
            <p className="muted">Based in {profile.location}</p>
            <div className="row">
              <button className="btn" onClick={() => onNavigate("projects")}>
                See my work
              </button>
              <a className="btn ghost" href={profile.cvUrl} download>
                Download CV ↓
              </a>
            </div>
          </>
        )}

        {active === "projects" && (
          <>
            <h2 id="panel-title" ref={headingRef} tabIndex={-1}>
              Selected work
            </h2>
            {orgs.map((org) => (
              <section key={org} className="project-group">
                <h3 className="group-title">{org}</h3>
                <ul className="cards">
                  {projects
                    .filter((p) => p.org === org)
                    .map((p) => (
                      <li key={p.title} className="card" style={{ ["--note" as string]: p.color }}>
                        <h3>{p.title}</h3>
                        <p>{p.desc}</p>
                        <div className="tags">
                          {p.tags.map((t) => (
                            <span key={t}>{t}</span>
                          ))}
                        </div>
                        {p.href && (
                          <a href={p.href} target="_blank" rel="noreferrer">
                            {p.href.includes("github.com") ? "View on GitHub ↗" : "Visit site ↗"}
                          </a>
                        )}
                      </li>
                    ))}
                </ul>
              </section>
            ))}
          </>
        )}

        {active === "skills" && (
          <>
            <h2 id="panel-title" ref={headingRef} tabIndex={-1}>
              What I work with
            </h2>
            {skills.map((g) => (
              <section key={g.group} className="shelf">
                <h3>{g.group}</h3>
                <div className="chips">
                  {g.items.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </section>
            ))}
          </>
        )}

        {active === "experience" && (
          <>
            <h2 id="panel-title" ref={headingRef} tabIndex={-1}>
              Where I’ve been
            </h2>
            <ol className="timeline">
              {experience.map((e) => (
                <li key={e.period + e.role}>
                  <span className="muted">{e.period}</span>
                  <h3>
                    {e.role} <span className="muted">· {e.company}</span>
                  </h3>
                  <p>{e.desc}</p>
                </li>
              ))}
            </ol>
          </>
        )}

        {active === "contact" && (
          <>
            <h2 id="panel-title" ref={headingRef} tabIndex={-1}>
              Let’s talk
            </h2>
            <p>Hiring for a UI or frontend role, or want to build something together? Drop me an email.</p>
            <a className="email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <p>
              <a className="btn" href={profile.cvUrl} download>
                Download CV ↓
              </a>
            </p>
            <ul className="links">
              {profile.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noreferrer">
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </aside>
  );
}
