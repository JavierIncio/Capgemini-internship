import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full' },
  {
    path: 'categories',
    loadComponent: () => import('./category/category-list/category-list'),
  },
  {
    path: 'authors',
    loadComponent: () => import('./author/author-list/author-list'),
  },
  { path: 'games', loadComponent: () => import('./game/game-list/game-list') },
  { path: 'clients', loadComponent: () => import('./client/client-list/client-list') },
  { path: 'loans', loadComponent: () => import('./loan/loan-list/loan-list') },
];
