import { useEffect, useState } from "react";
import { fetchBacklogTasksByProjectId } from "../queries/tasks/fetchBacklogTasksByProjectId";
import { Backlog } from "./Backlog";
import { Pagination } from "./pagination";
import { PAGE_SIZE_OPTIONS } from "../constants/constants";
import { useQuery } from "@tanstack/react-query";

export function PaginatedBacklog({ projectId }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [backlogItems, setBacklogItems] = useState([]);

  function handlePageChanged(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handlePageSizeChanged(size) {
    setPageSize(size);
  }

  const { isPending, isError, error, data } = useQuery({
    queryKey: ["tasks", { currentPage, pageSize, projectId }],
    queryFn: () =>
      fetchBacklogTasksByProjectId(currentPage, pageSize, projectId),
  });

  useEffect(() => {
    if (data) {
      console.log("API Response:", data);
      if (currentPage > data.meta.pagination.pageCount) {
        setCurrentPage(data.meta.pagination.pageCount);
      }
      setBacklogItems(data.data);
      setPageCount(data.meta.pagination.pageCount);
    }
  }, [data, currentPage]);

  return (
    <div className="backlog">
      <h2 className="backlog__title">Project Backlog</h2>

      {isPending && (
        <div className="backlog__loading">
          <span>Taken laden...</span>
        </div>
      )}

      {isError && (
        <div className="backlog__error">
          <span>Er is een fout opgetreden: {error.message}</span>
        </div>
      )}

      {!isPending && !isError && (
        <>
          <Backlog backlogItems={backlogItems} />
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            pageSize={pageSize}
            onPageChanged={handlePageChanged}
            onPageSizeChanged={handlePageSizeChanged}
          />
        </>
      )}
    </div>
  );
}
