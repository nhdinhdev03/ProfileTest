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
};
