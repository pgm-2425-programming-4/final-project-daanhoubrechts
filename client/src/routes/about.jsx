import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="main-content">
      <div className="page">
        <div className="page__content">
          <h1 className="page__title">Over deze applicatie</h1>

          <div className="about__section">
            <p className="page__text">
              Dit is een Kanban-applicatie ontwikkeld als eindopdracht voor het
              vak PGM-4 van de opleiding Programmeren aan de
              Arteveldehogeschool.
            </p>
            <p className="page__text">
              De applicatie is gebouwd met React en maakt gebruik van moderne
              webontwikkelingstechnologieën om een efficiënte en
              gebruiksvriendelijke taakbeheertool te creëren.
            </p>
          </div>

          <div className="about__section">
            <h2 className="page__subtitle">Technische details</h2>
            <p className="page__text">
              Deze applicatie is gebouwd met moderne
              webontwikkelingstechnologieën:
            </p>
            <div className="about__tech-stack">
              <span className="about__tech-item">React</span>
              <span className="about__tech-item">TanStack Router</span>
              <span className="about__tech-item">React Query</span>
              <span className="about__tech-item">Strapi CMS</span>
              <span className="about__tech-item">Custom CSS </span>
            </div>
          </div>

          <div className="about__social-section">
            <div className="about__social-links">
              <a
                href="https://www.linkedin.com/in/daan-houbrechts-245517331/"
                target="_blank"
                rel="noopener noreferrer"
                className="about__social-link"
              >
                <span className="about__social-icon">in</span>
                LinkedIn
              </a>
              <a
                href="https://github.com/daanhoubrechts"
                target="_blank"
                rel="noopener noreferrer"
                className="about__social-link"
              >
                <span className="about__social-icon">
                  <svg
                    className="github-icon"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                  >
                    <path
                      fill="currentColor"
                      d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.5-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.1-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.9 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 0z"
                    />
                  </svg>
                </span>
                GitHub
              </a>
            </div>
          </div>

          <div className="page__copyright">
            &copy; {new Date().getFullYear()} Daan Houbrechts -
            Arteveldehogeschool
          </div>
        </div>
      </div>
    </div>
  );
}
