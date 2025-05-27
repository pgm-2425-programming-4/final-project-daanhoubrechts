import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { fetchProjects } from "../data/fetchProjects";
import { useEffect, useState } from "react";

// Create a proper React component with uppercase name
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
        <div className="sidebar__title">PROJECTS</div>

        {projects.map((project) => (
          <div key={project.id} className="sidebar__item">
            <Link to="/tasks/$taskCat" params={{ taskCat: project.name }}>
              {project.name}
            </Link>
          </div>
        ))}
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
