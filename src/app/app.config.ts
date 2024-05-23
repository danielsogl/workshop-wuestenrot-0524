import { ApplicationConfig, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { format: 'dd.MM.yyyy' } },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
  ],
};
