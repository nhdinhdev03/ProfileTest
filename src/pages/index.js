// File: pages/index.js
import { lazy } from 'react';

// Export các trang chính
export const About = lazy(() => import('../components/About/About'));
export const Skills = lazy(() => import('../components/Skills/Skills'));
export const Projects = lazy(() => import('../components/Projects/Projects'));
export const Blog = lazy(() => import('../components/Blog/Blog'));
export const BlogDetail = lazy(() => import('../components/Blog/BlogDetail'));
export const Contact = lazy(() => import('../components/Contact/Contact'));
export const Experience = lazy(() => import('../components/Experience/Experience'));
export const Hero = lazy(() => import('../components/Hero/Hero'));
