import { useEffect, useState } from "react";
import { fetchTasks } from "../../data/fetchTasks";
import { Backlog } from "./Backlog";
import { Pagination } from "./Pagination";
import { PAGE_SIZE_OPTIONS } from "../../constants/constants";
import { useQuery } from "@tanstack/react-query";

export function PaginatedBacklog() {
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
    queryKey: ["tasks", { currentPage, pageSize }],
    queryFn: () => fetchTasks(currentPage, pageSize),
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

  // At this point we can assume data is not falsy

  return (
    <>
      <h1 className="title is-3">Backlog Taken</h1>
      <div style={{ marginBottom: "2rem" }}>
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
