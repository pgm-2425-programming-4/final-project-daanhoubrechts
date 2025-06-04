import { useEffect, useState } from "react";
import { fetchBacklogTasksByProjectId } from "../queries/fetchBacklogTasksByProjectId";
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

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h1>Project Backlog</h1>
      <div>
        <Backlog backlogItems={backlogItems} />
      </div>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        pageSize={pageSize}
        onPageChanged={handlePageChanged}
        onPageSizeChanged={handlePageSizeChanged}
      />
    </>
  );
}
