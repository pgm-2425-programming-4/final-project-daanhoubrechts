export function Task({ task }) {
  return (
    <div key={task.id} className="task-card">
      <div className="task-card__title">{task.title}</div>
    </div>
  );
}
