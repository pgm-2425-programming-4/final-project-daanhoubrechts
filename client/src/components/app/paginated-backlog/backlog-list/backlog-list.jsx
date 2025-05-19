export function BacklogList({ backlogItems }) {
  return (
    <ul>
      {backlogItems.map((backlogItem) => {
        return <li key={backlogItem.id}>{backlogItem.name}</li>;
      })}
    </ul>
  );
}
