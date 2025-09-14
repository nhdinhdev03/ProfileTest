// Tối ưu hóa smooth scroll - sử dụng native API khi có thể
export const smoothScrollTo = (targetY, duration = null) => {
  // Kiểm tra browser support cho smooth scroll
  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
    return;
  }
  
  // Fallback cho browser cũ
  const startY = window.scrollY;
  const distance = targetY - startY;
  
  // Tránh scroll nếu đã ở đúng vị trí
  if (Math.abs(distance) < 1) return;
  
  // Dynamic duration dựa trên khoảng cách
  const calculatedDuration = duration || Math.min(Math.abs(distance) * 0.3, 600);
  
  let start = null;

  // Simplified easing function
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const animate = (timestamp) => {
    if (start === null) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / calculatedDuration, 1);
    const easedProgress = easeOut(progress);
    
    window.scrollTo(0, startY + distance * easedProgress);
    
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
  
  // Sử dụng native smooth scroll khi có thể
  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  } else {
    smoothScrollTo(offsetPosition);
  }
};

// Simplified debounced scroll handler
export const createDebouncedScrollHandler = (callback, delay = 16) => {
  let timeoutId;
  
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
};
