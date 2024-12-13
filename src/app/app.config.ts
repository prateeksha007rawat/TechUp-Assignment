import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideClientHydration, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
        provideClientHydration(),
        importProvidersFrom(HttpClientModule),
        importProvidersFrom(BrowserModule),
        importProvidersFrom(CommonModule),

        importProvidersFrom(BrowserAnimationsModule),
  ]
};
