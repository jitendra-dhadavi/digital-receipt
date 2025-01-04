import { Routes } from '@angular/router';

export const PAGES_ROUTES: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
  },
];
