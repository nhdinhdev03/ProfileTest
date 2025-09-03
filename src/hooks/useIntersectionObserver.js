import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * Custom hook to detect when an element enters the viewport
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Percentage of element visibility required to trigger (0-1)
 * @param {string} options.rootMargin - Margin around the root element
 * @param {boolean} options.triggerOnce - Whether to disconnect the observer after first trigger
 * @returns {Array} [ref, isVisible, element] - Reference to attach, visibility state, and element
 */
function useIntersectionObserver({ 
  threshold = 0.1, 
  rootMargin = '0px', 
  triggerOnce = true 
} = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState(null);
  const observerRef = useRef(null);
  
  const callbackFunction = useCallback(entries => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
    
    // If we only want to trigger once and it's visible, disconnect
    if (entry.isIntersecting && triggerOnce && observerRef.current) {
      observerRef.current.disconnect();
    }
  }, [triggerOnce]);

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, {
      rootMargin,
      threshold,
    });
    
    observerRef.current = observer;
    
    if (element) observer.observe(element);
    
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [element, threshold, rootMargin, callbackFunction]);
  
  // Return ref callback function to set the element
  const ref = node => {
    if (node !== null) {
      setElement(node);
    }
  };
  
  return [ref, isVisible, element];
}

export default useIntersectionObserver;
