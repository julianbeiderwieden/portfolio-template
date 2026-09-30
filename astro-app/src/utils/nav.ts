/** The URL's path without a trailing slash, `/` for the home page. */
export const currentPath = (url: URL) => url.pathname.replace(/\/+$/, '') || '/';

/** /projects and the project pages, where the navigation lists all projects. */
export const isProjectsPath = (path: string) => path === '/projects' || path.startsWith('/projects/');
