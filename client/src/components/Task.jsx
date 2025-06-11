import { Tag } from "./Tag";

export function Task({ task }) {
  return (
    <div key={task.id} className="task-card">
      <div className="task-card__title">{task.title}</div>
      {task.labels && task.labels.length > 0 && (
        <div className="task-card__tags">
          {task.labels.map((label) => (
            <Tag key={label.id} label={label} />
          ))}
        </div>
      )}
    </div>
  );
}
