import { ApplicationConfig, ErrorHandler, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { GlobalErrorHandler } from '@angular-leanix/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as fromBase from './_store/root/base-info/base.reducer';
import { BaseEffects } from './_store/root/base-info/base.effects';
import { graphqlProvider } from './graphql.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(BaseEffects),
    provideStore({
      [fromBase.BASE_KEY]: fromBase.baseReducer,
    }),
    // provideRouterStore(),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideAnimations(),
    provideHttpClient(),
    graphqlProvider,
    provideRouter(appRoutes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
};
