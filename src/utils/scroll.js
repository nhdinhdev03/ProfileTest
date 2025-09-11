export const smoothScrollTo = (targetY) => {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const duration = Math.min(Math.abs(distance) * 0.5, 600);
  let start = null;

  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  const animate = (timestamp) => {
    if (start === null) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);
    
    const currentY = startY + distance * easedProgress;
    window.scrollTo(0, currentY);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};
