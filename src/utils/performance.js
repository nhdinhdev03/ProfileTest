/**
 * Utility functions để phát hiện và tối ưu performance
 */

// Detect device capabilities
export const detectDeviceCapabilities = () => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768;

  const isLowEnd = (() => {
    // Check memory if available
    if (navigator.deviceMemory && navigator.deviceMemory < 4) return true;

    // Check CPU cores if available
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)
      return true;

    // Check connection if available
    if (navigator.connection) {
      const connection = navigator.connection;
      if (
        connection.effectiveType === "slow-2g" ||
        connection.effectiveType === "2g"
      )
        return true;
      if (connection.saveData) return true;
    }

    return false;
  })();

  const preferReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  return {
    isMobile,
    isLowEnd,
    preferReducedMotion,
  };
};

// Get optimized settings based on device
export const getOptimizedSettings = () => {
  const capabilities = detectDeviceCapabilities();

  return {
    // Animation settings
    animations: {
      enabled: !capabilities.preferReducedMotion && !capabilities.isLowEnd,
      duration: capabilities.isLowEnd ? 0.1 : capabilities.isMobile ? 0.2 : 0.3,
      easing: capabilities.isLowEnd ? "linear" : "ease-out",
    },

    // Scroll settings
    scroll: {
      behavior: capabilities.isLowEnd ? "auto" : "smooth",
      throttle: capabilities.isLowEnd ? 100 : capabilities.isMobile ? 50 : 16,
    },

    // Visual effects
    effects: {
      shadows: !capabilities.isLowEnd,
      gradients: !capabilities.isLowEnd,
      backdropFilter: !capabilities.isLowEnd && !capabilities.isMobile,
      transforms: !capabilities.isLowEnd,
    },

    device: capabilities,
  };
};

// Throttle function optimized for performance
export const performanceThrottle = (func, delay) => {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), delay);
    }
  };
};

// Debounce function for expensive operations
export const performanceDebounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// Optimize images for performance
export const getOptimizedImageSettings = () => {
  const { isLowEnd, isMobile } = detectDeviceCapabilities();

  return {
    quality: isLowEnd ? 60 : isMobile ? 80 : 90,
    format: "webp",
    loading: "lazy",
    sizes: isMobile ? "100vw" : "50vw",
  };
};

export default {
  detectDeviceCapabilities,
  getOptimizedSettings,
  performanceThrottle,
  performanceDebounce,
  getOptimizedImageSettings,
};
