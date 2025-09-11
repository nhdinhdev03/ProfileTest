import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const useRouteTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  const startTransition = useCallback(() => {
    setIsTransitioning(true);
    
    // Thêm class cho document để có thể style toàn bộ app
    document.documentElement.classList.add('route-transitioning');
    
    // Tự động kết thúc transition sau một khoảng thời gian
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      document.documentElement.classList.remove('route-transitioning');
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const cleanup = startTransition();
    return cleanup;
  }, [location.pathname, startTransition]);

  return isTransitioning;
};

// Hook để preload component khi hover vào link
export const usePreloadRoute = () => {
  const preloadComponent = useCallback((importFunction) => {
    // Preload component để cải thiện performance
    importFunction().catch(() => {
      // Ignore errors khi preload
    });
  }, []);

  return preloadComponent;
};
