export function Backlog({ backlogItems }) {
  return (
    <table>
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
