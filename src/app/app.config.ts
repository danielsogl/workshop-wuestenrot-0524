import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  importProvidersFrom,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { NextFlightsModule } from './flight-booking/next-flights/next-flights.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(),
    importProvidersFrom(NextFlightsModule),
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { format: 'dd.MM.yyyy' } },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
  ],
};
