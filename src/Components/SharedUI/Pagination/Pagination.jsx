import React from 'react';
import './Pagination.css';

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  className = '',
  disabled = false
}) => {
  // Calculate visible page numbers
  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(maxVisiblePages / 2);
    
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    // Adjust start if we're near the end
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  if (totalPages <= 1) return null;

  return (
    <nav 
      className={`pagination-nav ${className}`} 
      aria-label="Pagination Navigation"
      role="navigation"
    >
      <div className="pagination-info">
        <span className="pagination-text">
          Page {currentPage} of {totalPages}
        </span>
      </div>
      
      <ul className="pagination-list">
        {/* First Page */}
        {showFirstLast && !visiblePages.includes(1) && (
          <>
            <li className="pagination-item">
              <button
                className="pagination-btn pagination-btn--first"
                onClick={() => onPageChange(1)}
                disabled={disabled || isFirstPage}
                aria-label="Go to first page"
                title="First page"
              >
                <i className="fa-solid fa-angles-left"></i>
              </button>
            </li>
            {visiblePages[0] > 2 && (
              <li className="pagination-item pagination-item--ellipsis">
                <span className="pagination-ellipsis">...</span>
              </li>
            )}
          </>
        )}

        {/* Previous Page */}
        {showPrevNext && (
          <li className="pagination-item">
            <button
              className="pagination-btn pagination-btn--prev"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={disabled || isFirstPage}
              aria-label="Go to previous page"
              title="Previous page"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
          </li>
        )}

        {/* Page Numbers */}
        {visiblePages.map((page) => (
          <li key={page} className="pagination-item">
            <button
              className={`pagination-btn pagination-btn--number ${
                page === currentPage ? 'pagination-btn--active' : ''
              }`}
              onClick={() => onPageChange(page)}
              disabled={disabled}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
              title={`Page ${page}`}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Next Page */}
        {showPrevNext && (
          <li className="pagination-item">
            <button
              className="pagination-btn pagination-btn--next"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={disabled || isLastPage}
              aria-label="Go to next page"
              title="Next page"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </li>
        )}

        {/* Last Page */}
        {showFirstLast && !visiblePages.includes(totalPages) && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <li className="pagination-item pagination-item--ellipsis">
                <span className="pagination-ellipsis">...</span>
              </li>
            )}
            <li className="pagination-item">
              <button
                className="pagination-btn pagination-btn--last"
                onClick={() => onPageChange(totalPages)}
                disabled={disabled || isLastPage}
                aria-label="Go to last page"
                title="Last page"
              >
                <i className="fa-solid fa-angles-right"></i>
              </button>
            </li>
          </>
        )}
      </ul>

      {/* Page Size Selector (Optional) */}
      <div className="pagination-size-selector">
        <label htmlFor="page-size" className="pagination-size-label">
          Show:
        </label>
        <select
          id="page-size"
          className="pagination-size-select"
          disabled={disabled}
          aria-label="Items per page"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </nav>
  );
};

export default Pagination;
