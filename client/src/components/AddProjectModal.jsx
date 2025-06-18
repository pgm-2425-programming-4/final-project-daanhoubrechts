import { useState } from "react";
import { createProject } from "../queries/projects/createProject";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function AddProjectModal({ onClose }) {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const submitData = {
      data: {
        name: name.trim(),
      },
    };

    createProjectMutation.mutate(submitData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Project</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {createProjectMutation.isError && (
            <div className="error-message">
              <p>
                Error creating project: {createProjectMutation.error.message}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="project-name">Project Name *</label>
              <input
                id="project-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter project name"
                required
                className="form-control"
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={onClose}
                disabled={createProjectMutation.isPending}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn--primary"
                disabled={createProjectMutation.isPending || !name.trim()}
              >
                {createProjectMutation.isPending
                  ? "Creating..."
                  : "Create Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
