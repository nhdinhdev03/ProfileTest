import { lazy } from 'react';
import MainLayout from '../Layouts/MainLayout';
import { ROUTES } from './routeConstants';

// Lazy load các component với preloading để tối ưu hiệu suất
const About = lazy(() => 
  import('../components/About/About').then(module => ({ default: module.default }))
);
const Skills = lazy(() => 
  import('../components/Skills/Skills').then(module => ({ default: module.default }))
);
const Projects = lazy(() => 
  import('../components/Projects/Projects').then(module => ({ default: module.default }))
);
const Blog = lazy(() => 
  import('../components/Blog/Blog').then(module => ({ default: module.default }))
);
const BlogDetail = lazy(() => 
  import('../components/Blog/BlogDetail').then(module => ({ default: module.default }))
);
const Contact = lazy(() => 
  import('../components/Contact/Contact').then(module => ({ default: module.default }))
);
const Experience = lazy(() => 
  import('../components/Experience/Experience').then(module => ({ default: module.default }))
);
const Hero = lazy(() => 
  import('../components/Hero/Hero').then(module => ({ default: module.default }))
);

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