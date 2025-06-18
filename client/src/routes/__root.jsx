import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { fetchProjects } from "../queries/projects/fetchProjects";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AddProjectModal } from "../components/AddProjectModal";

const RootComponent = () => {
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  //projects ophalen
  const {
    data: projectsData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const projects = projectsData?.data || [];

  // Loading state for projects
  if (isPending) {
    return (
      <div className="loading-container">
        <p>Projecten laden...</p>
      </div>
    );
  }

  // Error state for projects
  if (isError) {
    return (
      <div className="error-container">
        <p>Fout bij het laden van projecten: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__section">
          <div className="sidebar__item">
            <Link
              to="/"
              activeProps={{ className: "sidebar__item--active active" }}
            >
              Home
            </Link>
          </div>
        </div>
        <div className="sidebar__section">
          <h2 className="sidebar__title">PROJECTS</h2>
          <div className="sidebar__project">
            {projects.map((project) => (
              <div key={project.id} className="sidebar__item">
                <Link
                  to="/projects/$projectId"
                  params={{ projectId: project.id }}
                  activeProps={{ className: "sidebar__item--active active" }}
                >
                  {project.name}
                </Link>
              </div>
            ))}
          </div>
          <button
            className="btn btn--small btn--outline add-project-btn"
            onClick={() => setShowAddProjectModal(true)}
          >
            + New Project
          </button>
        </div>
        <div className="sidebar__section">
          <h2 className="sidebar__title">INFO</h2>
          <div className="sidebar__item">
            <Link
              to="/about"
              activeProps={{ className: "sidebar__item--active active" }}
            >
              About
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
      {showAddProjectModal && (
        <AddProjectModal onClose={() => setShowAddProjectModal(false)} />
      )}
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
