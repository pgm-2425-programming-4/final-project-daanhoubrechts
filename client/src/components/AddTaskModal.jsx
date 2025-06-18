import { useState, useCallback } from "react";
import {
  fetchStatuses,
  getStatusName,
} from "../queries/statuses/fetchStatuses";
import { fetchLabels, getLabelName } from "../queries/labels/fetchLabels";
import { createTask } from "../queries/tasks/createTask";
import { AddLabelForm } from "./AddLabelForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function AddTaskModal({ projectId, onClose, onTaskAdded }) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [labels, setLabels] = useState([]);
  const [showAddLabelForm, setShowAddLabelForm] = useState(false);

  // Fetch statussen
  const {
    data: statusesData,
    isPending: isStatusesLoading,
    isError: isStatusesError,
    error: statusesError,
  } = useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
  });

  const availableStatuses = statusesData || [];

  // Set default status when statuses are loaded
  if (availableStatuses.length > 0 && !status) {
    setStatus(availableStatuses[0].id);
  }

  // Fetch labels
  const {
    data: labelsData,
    isPending: isLabelsLoading,
    isError: isLabelsError,
    error: labelsError,
  } = useQuery({
    queryKey: ["labels"],
    queryFn: fetchLabels,
  });

  const availableLabels = labelsData || [];

  const handleLabelToggle = useCallback(
    (labelId) => {
      if (labels.includes(labelId)) {
        setLabels(labels.filter((id) => id !== labelId));
      } else {
        setLabels([...labels, labelId]);
      }
    },
    [labels]
  );

  const handleLabelAdded = useCallback(
    (createdLabel) => {
      queryClient.invalidateQueries({ queryKey: ["labels"] });
      setLabels([...labels, createdLabel.id]);
      setShowAddLabelForm(false);
    },
    [queryClient, labels]
  );

  // taken creeren mutatie
  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      if (onTaskAdded) {
        onTaskAdded(data);
      }

      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const submitData = {
      data: {
        title: title,
        description: description || undefined,
        current_status: status || undefined,
        project: projectId || undefined,
        labels: labels.length > 0 ? labels : undefined,
      },
    };

    createTaskMutation.mutate(submitData);
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
          {(isStatusesLoading || isLabelsLoading) && (
            <div className="loading-message">
              <p>Loading data...</p>
            </div>
          )}

          {isStatusesError && (
            <div className="error-message">
              <p>Error loading statuses: {statusesError.message}</p>
            </div>
          )}

          {isLabelsError && (
            <div className="error-message">
              <p>Error loading labels: {labelsError.message}</p>
            </div>
          )}

          {!isStatusesLoading &&
            !isLabelsLoading &&
            !isStatusesError &&
            !isLabelsError && (
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
                          <span className="label-text">
                            {getLabelName(label)}
                          </span>
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
                    disabled={createTaskMutation.isPending}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn--primary"
                    disabled={createTaskMutation.isPending || !title.trim()}
                  >
                    {createTaskMutation.isPending
                      ? "Creating..."
                      : "Create Task"}
                  </button>
                </div>
              </form>
            )}
        </div>
      </div>
    </div>
  );
}
