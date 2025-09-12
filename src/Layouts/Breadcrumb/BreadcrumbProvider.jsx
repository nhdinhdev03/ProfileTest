import React, { createContext, useContext, useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';

const BreadcrumbContext = createContext({
  customBreadcrumbs: null,
  setCustomBreadcrumbs: () => {},
  resetBreadcrumbs: () => {},
});

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
};

const BreadcrumbProvider = memo(({ children }) => {
  const [customBreadcrumbs, setCustomBreadcrumbsState] = useState(null);

  const setCustomBreadcrumbs = useCallback((breadcrumbs) => {
    setCustomBreadcrumbsState(breadcrumbs);
  }, []);

  const resetBreadcrumbs = useCallback(() => {
    setCustomBreadcrumbsState(null);
  }, []);

  const value = {
    customBreadcrumbs,
    setCustomBreadcrumbs,
    resetBreadcrumbs,
  };

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  );
});

BreadcrumbProvider.displayName = 'BreadcrumbProvider';

BreadcrumbProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BreadcrumbProvider;
