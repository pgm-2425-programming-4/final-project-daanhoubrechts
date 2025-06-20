import { createFileRoute, Link } from "@tanstack/react-router";
import { PaginatedBacklog } from "../../../components/PaginatedBacklog";
import { fetchBacklogTasksByProjectId } from "../../../queries/tasks/fetchBacklogTasksByProjectId";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/projects_/$projectId/backlog")({
  component: Backlog,
});

function Backlog() {
  const { projectId } = Route.useParams();

  const {
    isPending: isProjectLoading,
    isError: isProjectError,
    error: projectError,
  } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchBacklogTasksByProjectId(projectId),
  });

  if (isProjectLoading) {
    return (
      <div className="main-content backlog__loading">
        Loading project data...
      </div>
    );
  }

  if (isProjectError) {
    return (
      <div className="main-content">
        <div className="backlog__error">
          Error loading the project: {projectError.message}
        </div>
        <Link
          to="/projects/$projectId"
          params={{ projectId }}
          className="backlog__back-link"
        >
          Back to Project
        </Link>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="backlog-wrapper">
        <Link
          to="/projects/$projectId"
          params={{ projectId }}
          className="backlog__back-link"
        >
          Back to Project
        </Link>
        <PaginatedBacklog projectId={projectId} />
      </div>
    </div>
  );
}
