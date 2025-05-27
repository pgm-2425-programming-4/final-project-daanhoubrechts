import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="sidebar">
        <div class="sidebar__title">PROJECTS</div>

        <div className="sidebar__item">
          <Link to="/tasks/Pgm" params={{ taskCat: "Pgm" }}>
            {"Pgm"}
          </Link>
        </div>
        <div className="sidebar__item">
          <Link to="/tasks/Web" params={{ taskCat: "Web" }}>
            {"Web"}
          </Link>
        </div>
        <div className="sidebar__item">
          <Link to="/tasks/Atwork" params={{ taskCat: "Atwork" }}>
            {"Atwork"}
          </Link>
        </div>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
