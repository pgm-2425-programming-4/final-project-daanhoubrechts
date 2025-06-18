import { Task, ItemTypes } from "./Task";
import { useDrop } from "react-dnd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchStatuses } from "../queries/statuses/fetchStatuses";
import { updateTaskStatus } from "../queries/tasks/updateTaskStatus";
import { useMemo } from "react";

export function StatusColumn({ statusName, data, className, onTaskMoved }) {
  const queryClient = useQueryClient();

  //statussen ophalen
  const {
    data: statusesData,
    isPending: isStatusesLoading,
    isError: isStatusesError,
    error: statusesError,
  } = useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
  });

  const statuses = statusesData || [];

  const updateStatusMutation = useMutation({
    mutationFn: ({ taskId, statusId }) => updateTaskStatus(taskId, statusId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onTaskMoved();
    },
  });

  const hasValidData = data && data.data && Array.isArray(data.data);

  // Optimalisatie: gebruik useMemo om te voorkomen dat filtering bij elke render opnieuw gebeurt
  const filteredTasks = useMemo(
    () =>
      hasValidData
        ? data.data.filter(
            (task) =>
              task.current_status && task.current_status.Name === statusName
          )
        : [],
    [hasValidData, data, statusName]
  );

  // drop functionaliteit
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.TASK,
      drop: (item) => {
        const targetStatus = statuses.find(
          (status) => status.Name === statusName
        );

        if (targetStatus) {
          updateStatusMutation.mutate({
            taskId: item.documentId,
            statusId: targetStatus.documentId,
          });
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [statuses, statusName, updateStatusMutation]
  );

  return (
    <div
      ref={drop}
      className={`board__column ${isOver ? "board__column--drag-over" : ""}`}
    >
      <h2 className={`board__column-header ${className}`}>{statusName}</h2>

      {isStatusesLoading && (
        <div className="column-loading">Loading statuses...</div>
      )}

      {isStatusesError && (
        <div className="column-error">
          Error loading statuses: {statusesError.message}
        </div>
      )}

      {!isStatusesLoading &&
        !isStatusesError &&
        filteredTasks.map((task) => {
          return <Task key={task.id} task={task} />;
        })}
    </div>
  );
}
