import { Routes } from '@angular/router';
import { CountryLayout } from '../layouts/country-layout/country-layout';

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryLayout,
    children: [
      {
        path: 'by-capital',
        loadComponent: () => import('./pages/by-capital-page/by-capital-page'),
      },
      {
        path: 'by-country',
        loadComponent: () => import('./pages/by-country-page/by-country-page'),
      },
      {
        path: 'by-region',
        loadComponent: () => import('./pages/by-region-page/by-region-page'),
      },
      {
        path: 'by/:code',
        loadComponent: () => import('./pages/country-page/country-page'),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

export default countryRoutes;
