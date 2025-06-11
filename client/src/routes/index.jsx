import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="main-content">
      <div className="page">
        <div className="home__hero">
          <h1 className="home__hero-title">
            Welkom bij mijn Kanban Applicatie
          </h1>
          <p className="home__hero-subtitle">
            Een modern taakbeheersysteem voor efficiënte projectplanning en
            -organisatie
          </p>
        </div>

        <div className="page__content">
          <div className="home__content-section">
            <h2 className="page__title">Aan de slag</h2>
            <p className="page__text">
              Deze Kanban-applicatie helpt je bij het organiseren van taken
              binnen je projecten. Gebruik het board om je taken te visualiseren
              en te verplaatsen tussen verschillende statussen.
            </p>
          </div>

          <div className="home__content-section">
            <h3 className="page__subtitle">Wat kun je doen?</h3>
            <ul className="page__feature-compact">
              <li> De backlog van je project bekijken</li>
              <li> Nieuwe taken toevoegen met labels en prioriteiten</li>
              <li> Taken bekijken en beheren in een visueel board</li>
              <li> Taken organiseren op basis van status</li>
            </ul>
          </div>

          <div className="home__actions">
            <div className="page__link-list">
              <Link to="/about" className="page__link">
                Over deze app
              </Link>
            </div>

            <div className="page__copyright">
              © {new Date().getFullYear()} Daan Houbrechts -
              Arteveldehogeschool
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
