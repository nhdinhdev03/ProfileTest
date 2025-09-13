// File: router/routeConstants.js
export const API_VERSION = "v1";

export const ROUTES = {
  // User routes
  HOME: "/",
  ABOUT: `/${API_VERSION}/about`,
  SKILLS: `/${API_VERSION}/skills`,
  PROJECTS: `/${API_VERSION}/projects`,
  BLOG: `/${API_VERSION}/blog`,
  BLOG_DETAIL: `/${API_VERSION}/blog/:id`,
  CONTACT: `/${API_VERSION}/contact`,
  EXPERIENCE: `/${API_VERSION}/experience`,
  I18N_DEMO: `/${API_VERSION}/i18n-demo`,
};

// Route metadata for breadcrumb and navigation
export const ROUTE_METADATA = {
  [ROUTES.HOME]: {
    title: 'Home',
    description: 'Welcome to my portfolio',
    showBreadcrumb: false
  },
  [ROUTES.ABOUT]: {
    title: 'About Me',
    description: 'Learn more about my background and journey',
    showBreadcrumb: true
  },
  [ROUTES.SKILLS]: {
    title: 'Skills & Technologies',
    description: 'My technical skills and expertise',
    showBreadcrumb: true
  },
  [ROUTES.PROJECTS]: {
    title: 'Projects',
    description: 'Showcase of my work and projects',
    showBreadcrumb: true
  },
  [ROUTES.BLOG]: {
    title: 'Blog',
    description: 'My thoughts and articles',
    showBreadcrumb: true
  },
  [ROUTES.BLOG_DETAIL]: {
    title: 'Blog Post',
    description: 'Read the full article',
    showBreadcrumb: true
  },
  [ROUTES.CONTACT]: {
    title: 'Contact Me',
    description: 'Get in touch with me',
    showBreadcrumb: true
  },
  [ROUTES.EXPERIENCE]: {
    title: 'Work Experience',
    description: 'My professional experience and career journey',
    showBreadcrumb: true
  },
  [ROUTES.I18N_DEMO]: {
    title: 'Internationalization Demo',
    description: 'Demo of multi-language support',
    showBreadcrumb: true
  },
};