export enum NavigationPath {
  Home = '',
  Board = 'board',
  Login = 'login',
  // whatever = 'whatever',
}

export interface NavigationLink {
  route: NavigationPath;
  label: string;
  params?: Record<string, any>;
}
