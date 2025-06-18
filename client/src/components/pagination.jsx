import { PAGE_SIZE_OPTIONS } from "../constants/constants";

export function Pagination({
  currentPage,
  pageCount,
  pageSize,
  onPageChanged,
  onPageSizeChanged,
}) {
  let pageNumberArray;

  if (pageCount <= 6) {
    pageNumberArray = [];
    for (let i = 0; i < pageCount; i++) {
      pageNumberArray.push(i + 1);
    }
  } else if (currentPage > 3 && currentPage < pageCount - 2) {
    pageNumberArray = [
      1,
      null,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      null,
      pageCount,
    ];
  } else if (currentPage <= 3) {
    pageNumberArray = [1, 2, 3, 4, null, pageCount];
  } else {
    pageNumberArray = [
      1,
      null,
      pageCount - 3,
      pageCount - 2,
      pageCount - 1,
      pageCount,
    ];
  }

  const pageLinks = [];
  pageNumberArray.forEach((pageNumber, index) => {
    if (pageNumber === null) {
      pageLinks.push(
        <li className="pagination__list-item" key={index}>
          <span className="pagination__ellipsis">&hellip;</span>
        </li>
      );
    } else {
      pageLinks.push(
        <li className="pagination__list-item" key={index}>
          <button
            className={`pagination__link ${
              pageNumber === currentPage ? "pagination__link--current" : ""
            }`}
            aria-label={`Go to page ${pageNumber}`}
            onClick={() => onPageChanged(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      );
    }
  });

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <div className="pagination__size-select">
        <select
          className="pagination__select"
          defaultValue={pageSize}
          onChange={(event) => onPageSizeChanged(event.target.value)}
        >
          {PAGE_SIZE_OPTIONS.map((pageSizeOption) => {
            return (
              <option value={pageSizeOption} key={pageSizeOption}>
                {pageSizeOption} items per page
              </option>
            );
          })}
        </select>
      </div>

      <div className="pagination__controls">
        <button
          className="pagination__button"
          disabled={currentPage === 1}
          onClick={() => onPageChanged(currentPage - 1)}
        >
          Previous
        </button>

        <ul className="pagination__list">{pageLinks}</ul>

        <button
          className="pagination__button"
          disabled={currentPage === pageCount}
          onClick={() => onPageChanged(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </nav>
  );
}
