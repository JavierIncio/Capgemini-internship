import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'basic',
    title: 'Pipes Básicos',
    loadComponent: () => import('./pages/basic-page/basic-page'),
  },
  {
    path: 'number',
    title: 'Number Pipes',
    loadComponent: () => import('./pages/number-page/number-page'),
  },
  {
    path: 'uncommon',
    title: 'Uncommon Pipes',
    loadComponent: () => import('./pages/uncommon-page/uncommon-page'),
  },
  {
    path: 'custom',
    title: 'Custom Pipes',
    loadComponent: () => import('./pages/custom-page/custom-page'),
  },
  {
    path: '**',
    redirectTo: 'basic',
  },
];
