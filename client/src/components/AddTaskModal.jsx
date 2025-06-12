import { useState, useEffect } from "react";
import {
  fetchStatuses,
  getStatusName,
} from "../queries/statuses/fetchStatuses";
import { fetchLabels, getLabelName } from "../queries/labels/fetchLabels";
import { createTask } from "../queries/tasks/createTask";
import { AddLabelForm } from "./AddLabelForm";

export function AddTaskModal({ projectId, onClose, onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [labels, setLabels] = useState([]);
  const [availableStatuses, setAvailableStatuses] = useState([]);
  const [availableLabels, setAvailableLabels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddLabelForm, setShowAddLabelForm] = useState(false);

  // Fetch statuses and labels when component mounts
  useEffect(() => {
    const loadData = async () => {
      const statusesData = await fetchStatuses();
      setAvailableStatuses(statusesData);

      // Set default status if available
      if (statusesData && statusesData.length > 0) {
        setStatus(statusesData[0].id);
      }

      const labelsData = await fetchLabels();
      setAvailableLabels(labelsData);
    };

    loadData();
  }, []);

  const handleLabelToggle = (labelId) => {
    if (labels.includes(labelId)) {
      setLabels(labels.filter((id) => id !== labelId));
    } else {
      setLabels([...labels, labelId]);
    }
  };

  const handleLabelAdded = (createdLabel) => {
    setAvailableLabels([...availableLabels, createdLabel]);
    setLabels([...labels, createdLabel.id]);
    setShowAddLabelForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);

    try {
      const taskData = {
        title,
        description: description || null,
        current_status: status,
        project: projectId,
        labels: labels,
      };

      const data = await createTask(taskData);

      // Notify parent component of success
      if (onTaskAdded) {
        onTaskAdded(data);
      }

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Task</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="task-title">Title *</label>
              <input
                id="task-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="task-description">Description</label>
              <textarea
                id="task-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
                className="form-control"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label htmlFor="task-status">Status</label>
              <select
                id="task-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="form-control"
              >
                {availableStatuses.map((statusOption) => (
                  <option key={statusOption.id} value={statusOption.id}>
                    {getStatusName(statusOption)}
                  </option>
                ))}
              </select>
            </div>

            {availableLabels.length > 0 && (
              <div className="form-group">
                <label>Labels</label>
                <div className="labels-selection">
                  {availableLabels.map((label) => (
                    <div
                      key={label.id}
                      className="label-checkbox"
                      onClick={() => handleLabelToggle(label.id)}
                    >
                      <input
                        type="checkbox"
                        id={`label-${label.id}`}
                        checked={labels.includes(label.id)}
                        onChange={(e) => e.stopPropagation()}
                      />
                      <span className="label-text">{getLabelName(label)}</span>
                    </div>
                  ))}
                </div>

                {!showAddLabelForm ? (
                  <button
                    type="button"
                    className="btn btn--small btn--secondary"
                    onClick={() => setShowAddLabelForm(true)}
                  >
                    + Add New Label
                  </button>
                ) : (
                  <AddLabelForm
                    onLabelAdded={handleLabelAdded}
                    onCancel={() => setShowAddLabelForm(false)}
                  />
                )}
              </div>
            )}

            <div className="form-actions">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn--primary"
                disabled={isLoading || !title.trim()}
              >
                {isLoading ? "Creating..." : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
