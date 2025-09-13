import { lazy } from 'react';
import { ROUTES, ROUTE_METADATA } from 'router/routeConstants';

// Lazy load các component từ thư mục Pages để tối ưu hiệu suất
const About = lazy(() => 
  import('pages/About/About').then(module => ({ default: module.default }))
);
const Skills = lazy(() => 
  import('pages/Skills/Skills').then(module => ({ default: module.default }))
);
const Projects = lazy(() => 
  import('pages/Projects/Projects').then(module => ({ default: module.default }))
);
const Blog = lazy(() => 
  import('pages/Blog/Blog').then(module => ({ default: module.default }))
);
const BlogDetail = lazy(() => 
  import('pages/Blog/BlogDetail').then(module => ({ default: module.default }))
);
const Contact = lazy(() => 
  import('pages/Contact/Contact').then(module => ({ default: module.default }))
);
const Experience = lazy(() => 
  import('components/Hero/Experience/Experience').then(module => ({ default: module.default }))
);
const Hero = lazy(() => 
  import('pages/Hero/Hero').then(module => ({ default: module.default }))
);

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
  { 
    path: ROUTES.EXPERIENCE, 
    component: Experience, 
    metadata: ROUTE_METADATA[ROUTES.EXPERIENCE]
  },
];

export const privateRoutes = [
  // Có thể thêm các routes dành riêng cho admin sau này
];