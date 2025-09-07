import React, { useState, useMemo } from 'react';
import './EnhancedTable.css';

const EnhancedTable = ({
  data = [],
  columns = [],
  loading = false,
  onRowClick,
  onRowSelect,
  onBulkAction,
  selectable = false,
  sortable = false,
  onSort,
  className = '',
  emptyStateMessage = "No data available",
  emptyStateIcon = "📊",
  showRowNumbers = true,
  hoverable = true,
  striped = true
}) => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Handle row selection
  const handleRowSelect = (rowId, isSelected) => {
    const newSelectedRows = new Set(selectedRows);
    if (isSelected) {
      newSelectedRows.add(rowId);
    } else {
      newSelectedRows.delete(rowId);
    }
    setSelectedRows(newSelectedRows);
    onRowSelect?.(Array.from(newSelectedRows));
  };

  // Handle select all
  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      const allRowIds = data.map((row, index) => row.id || index);
      setSelectedRows(new Set(allRowIds));
      onRowSelect?.(allRowIds);
    } else {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    }
  };

  // Handle sorting
  const handleSort = (key) => {
    if (!sortable) return;
    
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
    onSort?.(key, direction);
  };

  // Get sort icon
  const getSortIcon = (key) => {
    if (!sortable) return null;
    
    if (sortConfig.key !== key) {
      return <i className="fa-solid fa-sort sort-icon sort-icon--inactive" />;
    }
    
    return (
      <i 
        className={`fa-solid ${
          sortConfig.direction === 'asc' ? 'fa-sort-up' : 'fa-sort-down'
        } sort-icon sort-icon--active`} 
      />
    );
  };

  // Sorted data
  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortable) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig, sortable]);

  const isAllSelected = data.length > 0 && selectedRows.size === data.length;
  const isIndeterminate = selectedRows.size > 0 && selectedRows.size < data.length;

  if (loading) {
    return (
      <div className="enhanced-table-container">
        <div className="table-skeleton">
          <div className="skeleton-header">
            {columns.map((_, index) => (
              <div key={index} className="skeleton-cell skeleton-cell--header" />
            ))}
          </div>
          {[...Array(5)].map((_, rowIndex) => (
            <div key={rowIndex} className="skeleton-row">
              {columns.map((_, cellIndex) => (
                <div key={cellIndex} className="skeleton-cell" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="enhanced-table-container">
        <div className="table-empty-state">
          <div className="empty-state-icon">{emptyStateIcon}</div>
          <h4 className="empty-state-title">No Data Found</h4>
          <p className="empty-state-description">{emptyStateMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`enhanced-table-container ${className}`}>
      {/* Bulk Actions Bar */}
      {selectable && selectedRows.size > 0 && (
        <div className="bulk-actions-bar">
          <div className="bulk-actions-info">
            <span className="selected-count">
              {selectedRows.size} item{selectedRows.size !== 1 ? 's' : ''} selected
            </span>
          </div>
          <div className="bulk-actions-buttons">
            <button
              className="bulk-action-btn bulk-action-btn--secondary"
              onClick={() => setSelectedRows(new Set())}
            >
              <i className="fa-solid fa-times me-2"></i>
              Clear Selection
            </button>
            {onBulkAction && (
              <button
                className="bulk-action-btn bulk-action-btn--danger"
                onClick={() => onBulkAction(Array.from(selectedRows))}
              >
                <i className="fa-solid fa-trash me-2"></i>
                Delete Selected
              </button>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="table-wrapper">
        <table className={`enhanced-table ${striped ? 'table-striped' : ''} ${hoverable ? 'table-hover' : ''}`}>
          <thead>
            <tr>
              {selectable && (
                <th className="table-header-cell table-header-cell--checkbox">
                  <div className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={isAllSelected}
                      ref={(input) => {
                        if (input) input.indeterminate = isIndeterminate;
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      aria-label="Select all rows"
                    />
                  </div>
                </th>
              )}
              {showRowNumbers && (
                <th className="table-header-cell table-header-cell--number">
                  #
                </th>
              )}
              {columns.map((column, index) => (
                <th
                  key={column.key || index}
                  className={`table-header-cell ${
                    sortable && column.sortable !== false ? 'table-header-cell--sortable' : ''
                  }`}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                  style={{ width: column.width }}
                >
                  <div className="header-content">
                    <span className="header-text">{column.title}</span>
                    {getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => {
              const rowId = row.id || index;
              const isSelected = selectedRows.has(rowId);
              
              return (
                <tr
                  key={rowId}
                  className={`table-row ${isSelected ? 'table-row--selected' : ''}`}
                  onClick={() => onRowClick?.(row, index)}
                >
                  {selectable && (
                    <td className="table-cell table-cell--checkbox">
                      <div className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          className="table-checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleRowSelect(rowId, e.target.checked);
                          }}
                          aria-label={`Select row ${index + 1}`}
                        />
                      </div>
                    </td>
                  )}
                  {showRowNumbers && (
                    <td className="table-cell table-cell--number">
                      {index + 1}
                    </td>
                  )}
                  {columns.map((column, cellIndex) => (
                    <td
                      key={column.key || cellIndex}
                      className="table-cell"
                      style={{ width: column.width }}
                    >
                      {column.render ? column.render(row[column.key], row, index) : row[column.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnhancedTable;
