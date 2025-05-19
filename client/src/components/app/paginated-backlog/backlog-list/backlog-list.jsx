export function BacklogList({ backlogItems }) {
  return (
    <table className="table is-hoverable">
      <thead>
        <tr>
          <th>Naam</th>
        </tr>
      </thead>
      <tbody>
        {backlogItems.map((backlogItem) => {
          return (
            <tr key={backlogItem.id}>
              <td>{backlogItem.name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
