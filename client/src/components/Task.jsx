import { useState, useCallback } from "react";
import { Tag } from "./Tag";
import { TaskModal } from "./TaskModal";
import { useDrag } from "react-dnd";

// ItemTypes voor drag & drop
export const ItemTypes = {
  TASK: "task",
};

export function Task({ task }) {
  const [showModal, setShowModal] = useState(false);

  // drag functionaliteit
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: {
      id: task.id,
      documentId: task.documentId,
      status: task.current_status.Name,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleTaskClick = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <div
        ref={drag}
        key={task.id}
        className={`task-card ${isDragging ? "task-card--dragging" : ""}`}
        onClick={handleTaskClick}
      >
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
