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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(data.data || []);

  useEffect(() => {
    const loadLabels = async () => {
      const labels = await fetchLabels();
      setAvailableLabels(labels);
    };

    loadLabels();
  }, []);

  useEffect(() => {
    let filtered = tasks;

    // filteren op geselecteerde label
    if (selectedLabelId) {
      filtered = filtered.filter(
        (task) =>
          task.labels &&
          task.labels.some((label) => label.id.toString() === selectedLabelId)
      );
    }

    // filteren op zoekterm
    if (searchTerm) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  }, [selectedLabelId, searchTerm, tasks]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask.data]);
    window.location.reload();
  };

  const handleTaskMoved = async () => {
    const updatedData = await fetchTasksByProjectId(params.projectId);
    setTasks(updatedData.data || []);
  };

  const handleLabelChange = (e) => {
    setSelectedLabelId(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
