import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook để tối ưu scroll events với requestAnimationFrame
 * @param {Function} callback - Function được gọi khi scroll
 * @param {number} threshold - Ngưỡng scroll để hiển thị button (default: 300)
 * @returns {Object} - { isVisible, scrollProgress }
 */
export const useScrollProgress = (callback, threshold = 300) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef();
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.pageYOffset;
    
    // Skip if scroll hasn't changed significantly (optimization)
    if (Math.abs(scrollY - lastScrollY.current) < 5) return;
    lastScrollY.current = scrollY;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollY / maxScroll, 1);
    
    setIsVisible(scrollY > threshold);
    setScrollProgress(progress);
    
    // Call additional callback if provided
    if (callback) callback(scrollY, progress);
  }, [callback, threshold]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial call
    handleScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return { isVisible, scrollProgress };
};

/**
 * Hook để smooth scroll tới top với native browser API
 * @returns {Function} scrollToTop function
 */
export const useSmoothScrollToTop = () => {
  return useCallback(() => {
    // Sử dụng native smooth scroll cho performance tốt nhất
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
};

export default { useScrollProgress, useSmoothScrollToTop };