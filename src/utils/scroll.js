// Tối ưu hóa smooth scroll với performance improvements
export const smoothScrollTo = (targetY, duration = null) => {
  const startY = window.scrollY;
  const distance = targetY - startY;
  
  // Dynamic duration based on distance for better UX
  const calculatedDuration = duration || Math.min(Math.abs(distance) * 0.4, 800);
  
  // Tránh scroll nếu đã ở đúng vị trí
  if (Math.abs(distance) < 1) {
    return;
  }
  
  let start = null;

  // Improved easing function cho smooth transition
  const easeInOutQuart = (t) => {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
  };

  const animate = (timestamp) => {
    if (start === null) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / calculatedDuration, 1);
    const easedProgress = easeInOutQuart(progress);
    
    const currentY = startY + distance * easedProgress;
    window.scrollTo(0, currentY);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

// Utility function để check nếu element đang visible trong viewport
export const isElementInViewport = (element, offset = 0) => {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
  return (
    rect.top >= -offset &&
    rect.left >= 0 &&
    rect.bottom <= windowHeight + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Scroll to element với smooth animation
export const scrollToElement = (element, headerOffset = 80) => {
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
  smoothScrollTo(offsetPosition);
};

// Debounced scroll handler cho performance
export const createDebouncedScrollHandler = (callback, delay = 16) => {
  let timeoutId;
  
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
};
