import { Routes } from '@angular/router';
import { PAGES_ROUTES } from './pages/pages.routes';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
    ...PAGES_ROUTES
];
