import { ApplicationConfig, DEFAULT_CURRENCY_CODE, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { NextFlightsModule } from './next-flights/next-flights.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(NextFlightsModule),
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { format: 'dd.MM.yyyy' } },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
  ],
};
