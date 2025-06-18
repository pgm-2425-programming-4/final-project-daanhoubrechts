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
          <h1 className="home__hero-title">Welcome to TaskTrek</h1>
          <p className="home__hero-subtitle">
            A comprehensive task management system for projects where tasks go
            on a "journey" from Backlog to Done
          </p>
        </div>

        <div className="page__content">
          <div className="home__content-section">
            <h2 className="page__title">Get Started</h2>
            <p className="page__text">
              TaskTrek helps you efficiently organize and track your projects.
              Use the visual Kanban board to visualize your tasks and gain
              insights into the progress of your projects.
            </p>
          </div>

          <div className="home__content-section">
            <h3 className="page__subtitle">What can you do?</h3>
            <ul className="page__feature-compact">
              <li>Create and manage multiple projects</li>
              <li>Visualize tasks on an intuitive Kanban board</li>
              <li>Move tasks between columns with drag-and-drop</li>
              <li>Assign labels to tasks for better categorization</li>
            </ul>
          </div>

          <div className="home__actions">
            <div className="page__link-list">
              <Link to="/about" className="page__link">
                About this app
              </Link>
            </div>

            <div className="page__copyright">
              &copy; {new Date().getFullYear()} Daan Houbrechts -
              Arteveldehogeschool
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
