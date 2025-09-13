import { lazy } from 'react';
import { ROUTES, ROUTE_METADATA } from 'router/routeConstants';

// Lazy load các component từ thư mục Pages để tối ưu hiệu suất
// Thêm retry mechanism cho các trường hợp network fail
const lazyWithRetry = (componentImport) => lazy(() => 
  componentImport().catch((error) => {
    console.warn('Failed to load component, retrying...', error);
    // Retry after 1 second
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(componentImport());
      }, 1000);
    });
  })
);

const About = lazyWithRetry(() => 
  import('pages/About/About').then(module => ({ default: module.default }))
);
const Skills = lazyWithRetry(() => 
  import('pages/Skills/Skills').then(module => ({ default: module.default }))
);
const Projects = lazyWithRetry(() => 
  import('pages/Projects/Projects').then(module => ({ default: module.default }))
);
const Blog = lazyWithRetry(() => 
  import('pages/Blog/Blog').then(module => ({ default: module.default }))
);
const BlogDetail = lazyWithRetry(() => 
  import('pages/Blog/BlogDetail').then(module => ({ default: module.default }))
);
const Contact = lazyWithRetry(() => 
  import('pages/Contact/Contact').then(module => ({ default: module.default }))
);
const Experience = lazyWithRetry(() => 
  import('components/Hero/Experience/Experience').then(module => ({ default: module.default }))
);
const Hero = lazyWithRetry(() => 
  import('pages/Hero/Hero').then(module => ({ default: module.default }))
);
const I18nDemo = lazyWithRetry(() => 
  import('pages/I18nDemo/I18nDemoPage').then(module => ({ default: module.default }))
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
  { 
    path: ROUTES.I18N_DEMO, 
    component: I18nDemo, 
    metadata: ROUTE_METADATA[ROUTES.I18N_DEMO]
  },
];

export const privateRoutes = [
  // Có thể thêm các routes dành riêng cho admin sau này
];