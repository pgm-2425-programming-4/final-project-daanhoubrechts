import { Tag } from "./Tag";

export function TaskModal({ task, onClose }) {
  if (!task) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{task.title}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="task-description">
            <h3>Description</h3>
            <p>{task.description ? task.description : "-"}</p>
          </div>

          <div className="task-details">
            <div className="task-detail">
              <h3>Status</h3>
              <p>{task.current_status.Name}</p>
            </div>

            <div className="task-detail">
              <h3>Project</h3>
              <p>{task.project.name}</p>
            </div>
          </div>

          {task.labels && task.labels.length > 0 && (
            <div className="task-labels">
              <h3>Labels</h3>
              <div className="labels-container">
                {task.labels.map((label) => (
                  <Tag key={label.id} label={label} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
