import { lazy } from 'react';
import MainLayout from '../Layouts/MainLayout';
import { ROUTES } from './routeConstants';

// Lazy load các component để tăng hiệu suất
const About = lazy(() => import('../components/About/About'));
const Skills = lazy(() => import('../components/Skills/Skills'));
const Projects = lazy(() => import('../components/Projects/Projects'));
const Blog = lazy(() => import('../components/Blog/Blog'));
const BlogDetail = lazy(() => import('../components/Blog/BlogDetail'));
const Contact = lazy(() => import('../components/Contact/Contact'));
const Experience = lazy(() => import('../components/Experience/Experience'));
const Hero = lazy(() => import('../components/Hero/Hero'));

export const publicRoutes = [
  { path: ROUTES.HOME, component: Hero, layout: MainLayout },
  { path: ROUTES.ABOUT, component: About, layout: MainLayout },
  { path: ROUTES.SKILLS, component: Skills, layout: MainLayout },
  { path: ROUTES.PROJECTS, component: Projects, layout: MainLayout },
  { path: ROUTES.BLOG, component: Blog, layout: MainLayout },
  { path: ROUTES.BLOG_DETAIL, component: BlogDetail, layout: MainLayout },
  { path: ROUTES.CONTACT, component: Contact, layout: MainLayout },
  { path: ROUTES.EXPERIENCE, component: Experience, layout: MainLayout },
];

export const privateRoutes = [
  // Có thể thêm các routes dành riêng cho admin sau này
];