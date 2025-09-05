// ===== router/index.js (optimized with code-splitting) =====


import Layout from "../Layout";
import { ROUTES } from "./routeConstants";
import withPageAnimation from '../components/withPageAnimation';
import { lazy } from "react";

// Lazy load page components for code-splitting
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Blog = lazy(() => import('../pages/Blog'));
const Contact = lazy(() => import('../pages/Contact'));
const Projects = lazy(() => import('../pages/Projects'));

// Apply page transition HOC
const AnimatedHome = withPageAnimation(Home);
const AnimatedAbout = withPageAnimation(About);
const AnimatedBlog = withPageAnimation(Blog);
const AnimatedContact = withPageAnimation(Contact);
const AnimatedProjects = withPageAnimation(Projects);


// Mẹo: luôn dùng ROUTES.* để không hard-code chuỗi
export const publicRoutes = [
  { path: ROUTES.HOME, component: AnimatedHome, layout: Layout },
  { path: ROUTES.ABOUT, component: AnimatedAbout, layout: Layout },
  { path: ROUTES.BLOG, component: AnimatedBlog, layout: Layout },
  { path: ROUTES.CONTACT, component: AnimatedContact, layout: Layout },
  { path: ROUTES.PROJECTS, component: AnimatedProjects, layout: Layout },
];

export const privateRoutes = [
  // Auth routes will be added after implementing an authentication system
];