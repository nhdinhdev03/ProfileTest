import { lazy } from 'react';
import { ROUTES, ROUTE_METADATA } from 'router/routeConstants';

// Enhanced lazy loading với retry mechanism và caching
const lazyWithRetry = (componentImport, maxRetries = 3) => {
  const loadComponent = async (retryCount = 0) => {
    try {
      const module = await componentImport();
      return { default: module.default };
    } catch (error) {
      if (retryCount < maxRetries) {
        console.warn(`Failed to load component, retrying... (${retryCount + 1}/${maxRetries})`, error);
        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.pow(2, retryCount) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        return loadComponent(retryCount + 1);
      }
      throw error;
    }
  };
  
  return lazy(() => loadComponent());
};

// Preload components với caching để tối ưu performance
const About = lazyWithRetry(() => import('pages/About/About'));
const Skills = lazyWithRetry(() => import('pages/Skills/Skills'));
const Projects = lazyWithRetry(() => import('pages/Projects/Projects'));
const Blog = lazyWithRetry(() => import('pages/Blog/Blog'));
const BlogDetail = lazyWithRetry(() => import('pages/Blog/BlogDetail'));
const Contact = lazyWithRetry(() => import('pages/Contact/Contact'));
const Hero = lazyWithRetry(() => import('pages/Hero/Hero'));

export const publicRoutes = [
  { 
    path: ROUTES.HOME, 
    component: Hero, 
    metadata: ROUTE_METADATA[ROUTES.HOME]
  },
  { 
    path: ROUTES.ABOUT, 
    component: About, 
    metadata: ROUTE_METADATA[ROUTES.ABOUT]
  },
  { 
    path: ROUTES.SKILLS, 
    component: Skills, 
    metadata: ROUTE_METADATA[ROUTES.SKILLS]
  },
  { 
    path: ROUTES.PROJECTS, 
    component: Projects, 
    metadata: ROUTE_METADATA[ROUTES.PROJECTS]
  },
  { 
    path: ROUTES.BLOG, 
    component: Blog, 
    metadata: ROUTE_METADATA[ROUTES.BLOG]
  },
  { 
    path: ROUTES.BLOG_DETAIL, 
    component: BlogDetail, 
    metadata: ROUTE_METADATA[ROUTES.BLOG_DETAIL]
  },
  { 
    path: ROUTES.CONTACT, 
    component: Contact, 
    metadata: ROUTE_METADATA[ROUTES.CONTACT]
  },
];

export const privateRoutes = [
  // Có thể thêm các routes dành riêng cho admin sau này
];