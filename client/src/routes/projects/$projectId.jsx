import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { fetchTasksByProjectId } from "../../queries/fetchTasksByProjectId";
import { StatusColumn } from "../../components/StatusColumn";

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
      <div className="header">
        <div className="header__action-buttons">
          <Link
            to="/projects/$projectId/backlog"
            params={{
              projectId: Route.useParams().projectId,
            }}
            className="btn btn--secondary"
          >
            View Backlog
          </Link>
        </div>
      </div>

      <div className="board">
        <StatusColumn
          statusName="To do"
          data={data}
          className={"board__column-header--todo"}
        />
        <StatusColumn
          statusName="In progress"
          data={data}
          className={"board__column-header--progress"}
        />
        <StatusColumn
          statusName="Ready for review"
          data={data}
          className={"board__column-header--review"}
        />
        <StatusColumn
          statusName="Done"
          data={data}
          className={"board__column-header--done"}
        />
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
