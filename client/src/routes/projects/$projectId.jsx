import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { fetchTasksByProjectId } from "../../queries/tasks/fetchTasksByProjectId";
import { StatusColumn } from "../../components/StatusColumn";
import { AddTaskModal } from "../../components/AddTaskModal";
import { fetchLabels, getLabelName } from "../../queries/labels/fetchLabels";
import { isEmpty } from "../../utils/isEmpty";

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
  const params = Route.useParams();
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [tasks, setTasks] = useState(data.data || []);
  const [availableLabels, setAvailableLabels] = useState([]);
  const [selectedLabelId, setSelectedLabelId] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(data.data || []);

  useEffect(() => {
    const loadLabels = async () => {
      const labels = await fetchLabels();
      setAvailableLabels(labels);
    };

    loadLabels();
  }, []);

  useEffect(() => {
    if (!selectedLabelId) {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(
        (task) =>
          task.labels &&
          task.labels.some((label) => label.id.toString() === selectedLabelId)
      );
      setFilteredTasks(filtered);
    }
  }, [selectedLabelId, tasks]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask.data]);
    window.location.reload();
  };

  const handleLabelChange = (e) => {
    setSelectedLabelId(e.target.value);
  };

  return (
    <div className="main-content">
      <div className="header">
        <div className="header__action-buttons">
          <button
            className="btn btn--primary"
            onClick={() => setShowAddTaskModal(true)}
          >
            Add task
          </button>

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
        />
        <StatusColumn
          statusName="In progress"
          data={{ data: filteredTasks }}
          className={"board__column-header--progress"}
        />
        <StatusColumn
          statusName="Ready for review"
          data={{ data: filteredTasks }}
          className={"board__column-header--review"}
        />
        <StatusColumn
          statusName="Done"
          data={{ data: filteredTasks }}
          className={"board__column-header--done"}
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
