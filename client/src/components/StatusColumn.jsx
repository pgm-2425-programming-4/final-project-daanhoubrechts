import { Task } from "./Task";

export function StatusColumn({ statusName, data, className }) {
  const hasValidData = data && data.data && Array.isArray(data.data);

  const filteredTasks = hasValidData
    ? data.data.filter(
        (task) => task.current_status && task.current_status.Name === statusName
      )
    : [];

  return (
    <div className="board__column">
      <h2 className={`board__column-header ${className}`}>{statusName}</h2>
      {filteredTasks.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
    </div>
  );
}
