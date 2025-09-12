import React, { memo, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import {
  FiHome,
  FiChevronRight,
  FiUser,
  FiCode,
  FiFolder,
  FiBookOpen,
  FiMail,
  FiBriefcase,
} from 'react-icons/fi';
import './Breadcrumb.scss';
import { ROUTES } from '../../router/routeConstants';

// Route mapping với metadata
const ROUTE_CONFIG = {
  [ROUTES.HOME]: {
    label: 'Home',
    icon: FiHome,
    color: '#6366f1',
    isHome: true
  },
  [ROUTES.ABOUT]: {
    label: 'About Me',
    icon: FiUser,
    color: '#8b5cf6',
    parent: ROUTES.HOME
  },
  [ROUTES.SKILLS]: {
    label: 'Skills',
    icon: FiCode,
    color: '#10b981',
    parent: ROUTES.HOME
  },
  [ROUTES.PROJECTS]: {
    label: 'Projects',
    icon: FiFolder,
    color: '#f59e0b',
    parent: ROUTES.HOME
  },
  [ROUTES.BLOG]: {
    label: 'Blog',
    icon: FiBookOpen,
    color: '#ef4444',
    parent: ROUTES.HOME
  },
  [ROUTES.CONTACT]: {
    label: 'Contact',
    icon: FiMail,
    color: '#06b6d4',
    parent: ROUTES.HOME
  },
  [ROUTES.EXPERIENCE]: {
    label: 'Experience',
    icon: FiBriefcase,
    color: '#ec4899',
    parent: ROUTES.HOME
  },
};

// Generate breadcrumb path từ current route
const generateBreadcrumbs = (pathname) => {
  const breadcrumbs = [];
  
  // Handle blog detail routes
  if (pathname.includes('/blog/') && pathname !== ROUTES.BLOG) {
    breadcrumbs.push(ROUTE_CONFIG[ROUTES.HOME]);
    breadcrumbs.push(ROUTE_CONFIG[ROUTES.BLOG]);
    breadcrumbs.push({
      label: 'Blog Post',
      icon: FiBookOpen,
      color: '#ef4444',
      isActive: true,
      path: pathname
    });
    return breadcrumbs;
  }

  // Find current route config
  const currentRoute = Object.keys(ROUTE_CONFIG).find(route => {
    if (route === pathname) return true;
    // Handle dynamic routes
    if (route.includes(':') && pathname.startsWith(route.split(':')[0])) return true;
    return false;
  });

  if (!currentRoute) {
    // Fallback for unknown routes
    breadcrumbs.push(ROUTE_CONFIG[ROUTES.HOME]);
    return breadcrumbs;
  }

  const config = ROUTE_CONFIG[currentRoute];
  
  // Always start with home if not already home
  if (!config.isHome) {
    breadcrumbs.push(ROUTE_CONFIG[ROUTES.HOME]);
  }
  
  // Add current page
  breadcrumbs.push({
    ...config,
    isActive: true,
    path: currentRoute
  });

  return breadcrumbs;
};

const BreadcrumbItem = memo(({ item, isLast, index }) => {
  const IconComponent = item.icon;
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { opacity: 0, x: 20, scale: 0.8 }
  };

  const content = (
    <motion.div
      className={`breadcrumb__item ${item.isActive ? 'breadcrumb__item--active' : ''}`}
      variants={itemVariants}
      whileHover={!item.isActive ? { 
        scale: 1.05,
        y: -2,
        transition: { duration: 0.2 }
      } : {}}
      whileTap={!item.isActive ? { scale: 0.95 } : {}}
    >
      <div 
        className="breadcrumb__icon-wrapper"
        style={{ '--item-color': item.color }}
      >
        <IconComponent className="breadcrumb__icon" />
      </div>
      <span className="breadcrumb__label">{item.label}</span>
      {item.isActive && (
        <motion.div
          className="breadcrumb__active-indicator"
          layoutId="activeBreadcrumb"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </motion.div>
  );

  return (
    <motion.li 
      className="breadcrumb__list-item"
      variants={itemVariants}
    >
      {item.isActive ? (
        content
      ) : (
        <Link 
          to={item.path || ROUTES.HOME} 
          className="breadcrumb__link"
          aria-label={`Navigate to ${item.label}`}
        >
          {content}
        </Link>
      )}
      
      {!isLast && (
        <motion.div
          className="breadcrumb__separator"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: (index + 0.5) * 0.1, duration: 0.2 }}
        >
          <FiChevronRight />
        </motion.div>
      )}
    </motion.li>
  );
});

const Breadcrumb = memo(({ className = '', showOnHome = false }) => {
  const location = useLocation();
  
  const breadcrumbs = useMemo(() => 
    generateBreadcrumbs(location.pathname), 
    [location.pathname]
  );

  // Don't show breadcrumb on home page unless explicitly requested
  if (location.pathname === ROUTES.HOME && !showOnHome) {
    return null;
  }

  // Don't show if only home breadcrumb
  if (breadcrumbs.length <= 1 && !showOnHome) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        className={`breadcrumb ${className}`}
        aria-label="Breadcrumb navigation"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        key={location.pathname} // Force re-animation on route change
      >
        <motion.ol 
          className="breadcrumb__list"
          variants={containerVariants}
        >
          {breadcrumbs.map((item, index) => (
            <BreadcrumbItem
              key={`${item.path || item.label}-${index}`}
              item={item}
              isLast={index === breadcrumbs.length - 1}
              index={index}
            />
          ))}
        </motion.ol>
      </motion.nav>
    </AnimatePresence>
  );
});

BreadcrumbItem.displayName = 'BreadcrumbItem';
Breadcrumb.displayName = 'Breadcrumb';

BreadcrumbItem.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    color: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    path: PropTypes.string
  }).isRequired,
  isLast: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired
};

Breadcrumb.propTypes = {
  className: PropTypes.string,
  showOnHome: PropTypes.bool
};

export default Breadcrumb;
