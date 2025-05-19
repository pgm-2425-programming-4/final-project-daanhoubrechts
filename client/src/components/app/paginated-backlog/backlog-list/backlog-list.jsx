export function BacklogList({ backlogItems }) {
  return (
    <table className="table is-hoverable">
      <thead>
        <tr>
          <th>Titel</th>
        </tr>
      </thead>
      <tbody>
        {backlogItems.map((backlogItem) => {
          return (
            <tr key={backlogItem.id}>
              <td>{backlogItem.title}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
