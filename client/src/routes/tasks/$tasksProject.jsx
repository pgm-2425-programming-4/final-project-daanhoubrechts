import { createFileRoute, notFound } from "@tanstack/react-router";
import { fetchTasksByProject } from "../../queries/fetchTasksByProject";

export const Route = createFileRoute("/tasks/$tasksProject")({
  loader: async ({ params }) => {
    const data = await fetchTasksByProject(params.tasksProject);
    if (!data) {
      console.error("No data found for Project:", params.tasksProject);
      throw notFound();
    }
    console.log("Data fetched for Project:", params.tasksProject, data);
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
