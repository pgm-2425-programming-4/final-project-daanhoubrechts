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
    return <div className="main-content">Loading project details...</div>;
  }

  if (isProjectError) {
    return (
      <div className="main-content">
        <div>Error loading project: {projectError.message}</div>
        <div>
          <Link to="/projects/$projectId" params={{ projectId }}>
            &larr; Back to Project
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div>
        <Link to="/projects/$projectId" params={{ projectId }}>
          Back to Project
        </Link>
      </div>
      <PaginatedBacklog projectId={projectId} />
    </div>
  );
}
