import { Task, ItemTypes } from "./Task";
import { useDrop } from "react-dnd";
import { useState, useEffect } from "react";
import { fetchStatuses } from "../queries/statuses/fetchStatuses";
import { updateTaskStatus } from "../queries/tasks/updateTaskStatus";

export function StatusColumn({ statusName, data, className, onTaskMoved }) {
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const getStatuses = async () => {
      const fetchedStatuses = await fetchStatuses();
      setStatuses(fetchedStatuses);
    };
    getStatuses();
  }, []);

  const hasValidData = data && data.data && Array.isArray(data.data);

  const filteredTasks = hasValidData
    ? data.data.filter(
        (task) => task.current_status && task.current_status.Name === statusName
      )
    : [];

  // drop functionaliteit
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.TASK,
      drop: (item) => {
        const targetStatus = statuses.find(
          (status) => status.Name === statusName
        );

        updateTaskStatus(item.documentId, targetStatus.documentId)
          .then(() => {
            onTaskMoved();
          })
          .catch((error) => {
            console.error("Error updating task status:", error);
          });
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [statuses, statusName, onTaskMoved]
  );

  return (
    <div
      ref={drop}
      className={`board__column ${isOver ? "board__column--drag-over" : ""}`}
    >
      <h2 className={`board__column-header ${className}`}>{statusName}</h2>
      {filteredTasks.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
    </div>
  );
}
