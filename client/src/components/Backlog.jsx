import { Tag } from "./Tag";

export function Backlog({ backlogItems }) {
  return (
    <div className="backlog__container">
      <table className="backlog__table">
        <thead>
          <tr className="backlog__table-header">
            <th>Title</th>
            <th>Labels</th>
          </tr>
        </thead>
        <tbody>
          {backlogItems.length === 0 ? (
            <tr className="backlog__table-row">
              <td className="backlog__table-cell" colSpan="2">
                No tasks found in the backlog.
              </td>
            </tr>
          ) : (
            backlogItems.map((backlogItem) => {
              return (
                <tr className="backlog__table-row" key={backlogItem.id}>
                  <td className="backlog__table-cell backlog__table-cell--title">
                    {backlogItem.title}
                  </td>
                  <td className="backlog__table-cell">
                    {backlogItem.labels && backlogItem.labels.length > 0 ? (
                      <div className="backlog__labels">
                        {backlogItem.labels.map((label) => (
                          <Tag key={label.id} label={label} />
                        ))}
                      </div>
                    ) : (
                      "-"
                    )}
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
