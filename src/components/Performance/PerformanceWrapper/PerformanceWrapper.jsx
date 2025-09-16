import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 * Performance wrapper component để tối ưu rendering
 * Sử dụng React.memo và shallow comparison
 */
const PerformanceWrapper = memo(({ 
  children, 
  dependencies = [], 
  enableMemo = true,
  className = '',
  style = {},
  ...props 
}) => {
  // Memoize children nếu enableMemo = true
  const memoizedChildren = useMemo(() => {
    return children;
  }, enableMemo ? dependencies : [children]);

  return (
    <div className={className} style={style} {...props}>
      {memoizedChildren}
    </div>
  );
});

PerformanceWrapper.displayName = 'PerformanceWrapper';

PerformanceWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  dependencies: PropTypes.array,
  enableMemo: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};

export default PerformanceWrapper;