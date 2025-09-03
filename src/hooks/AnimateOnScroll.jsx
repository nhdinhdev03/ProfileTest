import React from 'react';
import PropTypes from 'prop-types';
import useIntersectionObserver from './useIntersectionObserver';

/**
 * AnimateOnScroll component to add entrance animations to elements when they scroll into view
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to animate
 * @param {string} props.animation - CSS animation class to apply
 * @param {number} props.delay - Delay in seconds before animation starts
 * @param {number} props.duration - Duration of animation in seconds
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.threshold - Visibility threshold (0-1)
 * @param {string} props.rootMargin - Margin around viewport
 * @param {string} props.as - HTML element to render
 * @returns {React.ReactElement}
 */
const AnimateOnScroll = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.6,
  className = '',
  threshold = 0.1,
  rootMargin = '-50px 0px',
  as: Tag = 'div',
  ...rest
}) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  const animationClass = isVisible ? `animate-${animation}` : '';
  const animationStyle = {
    opacity: isVisible ? 1 : 0,
    transition: `all ${duration}s ease-out ${delay}s`,
  };

  return (
    <Tag
      ref={ref}
      className={`animate-element ${animationClass} ${className}`}
      style={animationStyle}
      data-visible={isVisible}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// Prop validation
AnimateOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
  animation: PropTypes.string,
  delay: PropTypes.number,
  duration: PropTypes.number,
  className: PropTypes.string,
  threshold: PropTypes.number,
  rootMargin: PropTypes.string,
  as: PropTypes.string
};

export default AnimateOnScroll;
