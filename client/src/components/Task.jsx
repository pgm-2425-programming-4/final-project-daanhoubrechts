import { useState } from "react";
import { Tag } from "./Tag";
import { TaskModal } from "./TaskModal";

export function Task({ task }) {
  const [showModal, setShowModal] = useState(false);

  const handleTaskClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div key={task.id} className="task-card" onClick={handleTaskClick}>
        <div className="task-card__title">{task.title}</div>
        {task.labels && task.labels.length > 0 && (
          <div className="task-card__tags">
            {task.labels.map((label) => (
              <Tag key={label.id} label={label} />
            ))}
          </div>
        )}
      </div>

      {showModal && <TaskModal task={task} onClose={handleCloseModal} />}
    </>
  );
}
