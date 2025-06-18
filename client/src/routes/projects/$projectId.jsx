import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { fetchTasksByProjectId } from "../../queries/tasks/fetchTasksByProjectId";
import { StatusColumn } from "../../components/StatusColumn";
import { AddTaskModal } from "../../components/AddTaskModal";
import { fetchLabels, getLabelName } from "../../queries/labels/fetchLabels";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/projects/$projectId")({
  loader: ({ params }) => {
    return { projectId: params.projectId };
  },

  component: RouteComponent,
  notFoundComponent: () => <div>No tasks found</div>,
});

function RouteComponent() {
  const { projectId } = Route.useLoaderData();
  const params = Route.useParams();
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [selectedLabelId, setSelectedLabelId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch tasks for the project
  const {
    data: tasksData,
    refetch: refetchTasks,
    isPending: isTasksLoading,
    isError: isTasksError,
    error: tasksError,
  } = useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => fetchTasksByProjectId(projectId),
    enabled: !!projectId,
  });

  // Fetch labels
  const { data: labelsData } = useQuery({
    queryKey: ["labels"],
    queryFn: fetchLabels,
  });

  const availableLabels = labelsData || [];

  // Use useMemo for both tasks and filtered tasks to avoid dependency issues
  const tasks = useMemo(() => tasksData?.data || [], [tasksData]);

  // Use useMemo to filter tasks based on label and search term
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Filter by selected label
    if (selectedLabelId) {
      filtered = filtered.filter(
        (task) =>
          task.labels &&
          task.labels.some((label) => label.id.toString() === selectedLabelId)
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [tasks, selectedLabelId, searchTerm]);

  const handleAddTask = () => {
    refetchTasks();
  };

  const handleTaskMoved = async () => {
    refetchTasks();
  };

  const handleLabelChange = (e) => {
    setSelectedLabelId(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Loading state
  if (isTasksLoading) {
    return (
      <div className="main-content">
        <div className="loading-message">Taken aan het laden...</div>
      </div>
    );
  }

  // Error state
  if (isTasksError) {
    return (
      <div className="main-content">
        <div className="error-message">
          Fout bij het laden van taken: {tasksError.message}
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="header">
        <div className="header__action-buttons">
          <div className="filter-dropdown">
            <select
              value={selectedLabelId}
              onChange={handleLabelChange}
              className="form-control"
              aria-label="Filter by label"
              title="Filter tasks by label"
            >
              <option value="">All Labels</option>
              {availableLabels.map((label) => (
                <option key={label.id} value={label.id}>
                  {getLabelName(label)}
                </option>
              ))}
            </select>
          </div>

          <div className="search-container">
            <input
              type="text"
              placeholder="Zoek op taak naam..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-box"
              aria-label="Zoek op taak naam"
            />
          </div>

          <button
            className="btn btn--primary"
            onClick={() => setShowAddTaskModal(true)}
          >
            Add task
          </button>

          <Link
            to="/projects/$projectId/backlog"
            params={{
              projectId: params.projectId,
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
          data={{ data: filteredTasks }}
          className={"board__column-header--todo"}
          onTaskMoved={handleTaskMoved}
        />
        <StatusColumn
          statusName="In progress"
          data={{ data: filteredTasks }}
          className={"board__column-header--progress"}
          onTaskMoved={handleTaskMoved}
        />
        <StatusColumn
          statusName="Ready for review"
          data={{ data: filteredTasks }}
          className={"board__column-header--review"}
          onTaskMoved={handleTaskMoved}
        />
        <StatusColumn
          statusName="Done"
          data={{ data: filteredTasks }}
          className={"board__column-header--done"}
          onTaskMoved={handleTaskMoved}
        />
      </div>

      {showAddTaskModal && (
        <AddTaskModal
          projectId={params.projectId}
          onClose={() => setShowAddTaskModal(false)}
          onTaskAdded={handleAddTask}
        />
      )}
    </div>
  );
}
