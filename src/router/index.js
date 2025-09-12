import { lazy } from 'react';
import MainLayout from '../Layouts/MainLayout';
import { ROUTES, ROUTE_METADATA } from './routeConstants';

// Lazy load các component từ thư mục Pages để tối ưu hiệu suất
const About = lazy(() => 
  import('../Pages/About/About').then(module => ({ default: module.default }))
);
const Skills = lazy(() => 
  import('../Pages/Skills/Skills').then(module => ({ default: module.default }))
);
const Projects = lazy(() => 
  import('../Pages/Projects/Projects').then(module => ({ default: module.default }))
);
const Blog = lazy(() => 
  import('../Pages/Blog/Blog').then(module => ({ default: module.default }))
);
const BlogDetail = lazy(() => 
  import('../Pages/Blog/BlogDetail').then(module => ({ default: module.default }))
);
const Contact = lazy(() => 
  import('../Pages/Contact/Contact').then(module => ({ default: module.default }))
);
const Experience = lazy(() => 
  import('../components/Experience/Experience').then(module => ({ default: module.default }))
);
const Hero = lazy(() => 
  import('../Pages/Hero/Hero').then(module => ({ default: module.default }))
);

export const publicRoutes = [
  { 
    path: ROUTES.HOME, 
    component: Hero, 
    layout: MainLayout,
    metadata: ROUTE_METADATA[ROUTES.HOME]
  },
  { 
    path: ROUTES.ABOUT, 
    component: About, 
    layout: MainLayout,
    metadata: ROUTE_METADATA[ROUTES.ABOUT]
  },
  { 
    path: ROUTES.SKILLS, 
    component: Skills, 
    layout: MainLayout,
    metadata: ROUTE_METADATA[ROUTES.SKILLS]
  },
  { 
    path: ROUTES.PROJECTS, 
    component: Projects, 
    layout: MainLayout,
    metadata: ROUTE_METADATA[ROUTES.PROJECTS]
  },
  { 
    path: ROUTES.BLOG, 
    component: Blog, 
    layout: MainLayout,
    metadata: ROUTE_METADATA[ROUTES.BLOG]
  },
  { 
    path: ROUTES.BLOG_DETAIL, 
    component: BlogDetail, 
    layout: MainLayout,
    metadata: ROUTE_METADATA[ROUTES.BLOG_DETAIL]
  },
  { 
    path: ROUTES.CONTACT, 
    component: Contact, 
    layout: MainLayout,
    metadata: ROUTE_METADATA[ROUTES.CONTACT]
  },
  { 
    path: ROUTES.EXPERIENCE, 
    component: Experience, 
    layout: MainLayout,
    metadata: ROUTE_METADATA[ROUTES.EXPERIENCE]
  },
];

export const privateRoutes = [
  // Có thể thêm các routes dành riêng cho admin sau này
];