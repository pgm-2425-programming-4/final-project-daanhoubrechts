export function Backlog({ backlogItems }) {
  return (
    <div className="backlog__container">
      <table className="backlog__table">
        <thead>
          <tr className="backlog__table-header">
            <th>Titel</th>
            <th>Labels</th>
          </tr>
        </thead>
        <tbody>
          {backlogItems.length === 0 ? (
            <tr className="backlog__table-row">
              <td className="backlog__table-cell" colSpan="2">
                Geen taken gevonden in de backlog.
              </td>
            </tr>
          ) : (
            backlogItems.map((backlogItem) => {
              return (
                <tr className="backlog__table-row" key={backlogItem.id}>
                  <td className="backlog__table-cell backlog__table-cell--title">
                    {backlogItem.title}
                  </td>
                  <td className="backlog__table-cell backlog__table-cell--labels">
                    {backlogItem.attributes?.labels?.data?.length > 0
                      ? backlogItem.attributes.labels.data.map((label) => (
                          <span className="tag" key={label.id}>
                            {label.attributes.name}
                          </span>
                        ))
                      : "-"}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
