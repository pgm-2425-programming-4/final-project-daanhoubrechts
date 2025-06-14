import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { fetchProjects } from "../queries/projects/fetchProjects";
import { useEffect, useState } from "react";

const RootComponent = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const result = await fetchProjects();
        console.log("Projects data:", result);
        setProjects(result.data || []);
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };

    loadProjects();
  }, []);

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
          {projects.map((project) => (
            <div key={project.id} className="sidebar__project">
              <div className="sidebar__item">
                <Link
                  to="/projects/$projectId"
                  params={{ projectId: project.id }}
                  activeProps={{ className: "sidebar__item--active active" }}
                >
                  {project.name}
                </Link>
              </div>
            </div>
          ))}
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
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
