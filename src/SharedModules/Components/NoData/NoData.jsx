import React from 'react';
import noData from '../../../assets/imgs/DataNo.svg';
import './NoData.css';

export default function NoData({ 
  title = "No Data Found", 
  description = "There's no data to display at the moment. Please check back later or try refreshing the page.",
  showRefreshButton = true,
  showBackButton = false,
  onRefresh,
  onBack,
  loading = false,
  customActions = null
}) {
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      window.location.reload();
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className={`no-data-container ${loading ? 'loading' : ''}`} role="status" aria-live="polite">
      <img 
        src={noData} 
        alt="No data illustration" 
        className="no-data-image"
        loading="lazy"
      />
      
      <h2 className="no-data-title">
        {title}
      </h2>
      
      <p className="no-data-description">
        {description}
      </p>
      
      <div className="no-data-actions">
        {customActions ? (
          customActions
        ) : (
          <>
            {showRefreshButton && (
              <button 
                className="no-data-button no-data-button--primary"
                onClick={handleRefresh}
                disabled={loading}
                aria-label="Refresh data"
              >
                <svg className="no-data-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            )}
            
            {showBackButton && (
              <button 
                className="no-data-button no-data-button--secondary"
                onClick={handleBack}
                disabled={loading}
                aria-label="Go back"
              >
                <svg className="no-data-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Go Back
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
