import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { fetchTasksByProjectId } from "../../queries/fetchTasksByProjectId";

export const Route = createFileRoute("/projects/$projectId")({
  loader: async ({ params }) => {
    const data = await fetchTasksByProjectId(params.projectId);
    if (isEmpty(data)) {
      console.error("No data found for Project:", params.projectId);
      throw notFound();
    }
    console.log("Data fetched for Project:", params.projectId, data);
    return data;
  },

  component: RouteComponent,
  notFoundComponent: ({ data }) => {
    if (data.data === "INVALID_ROUTE") {
      return <div>Invalid route</div>;
    }
    return <div>No tasks found</div>;
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <div className="main-content">
      <div className="board">
        <div className="board__column">
          <div className="mb-4">
            <Link
              to="/projects/$projectId/backlog"
              params={{
                projectId: Route.useParams().projectId,
              }}
            >
              View Backlog
            </Link>
          </div>
          {data.data.map((task) => {
            return (
              <div className="task-card">
                <div key={task.id} className="task-card__title">
                  {task.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function isEmpty(obj) {
  return (
    !obj || // Check if object is null/undefined
    !obj.data || // Check if data property exists
    !Array.isArray(obj.data) || // Check if data is an array
    obj.data.length === 0 // Check if array has elements
  );
}
