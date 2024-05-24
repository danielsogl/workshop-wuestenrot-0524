import { Routes } from '@angular/router';
import { FLIGHT_BOOKING_ROUTES } from './flight-booking/flight-booking.routes';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  ...FLIGHT_BOOKING_ROUTES,
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  // This _needs_ to be the last route!!
  {
    path: '**',
    component: NotFoundComponent,
  },
];
