import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { OktaAuthConfigService, OktaAuthModule } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import {
  HttpBackend,
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { tap, take } from 'rxjs';

import { appRoutes } from './app.routes';
import { authInterceptor } from './auth.interceptor';

function configInitializer(
  httpBackend: HttpBackend,
  configService: OktaAuthConfigService
): () => void {
  return () =>
    new HttpClient(httpBackend).get('api/config.json').pipe(
      tap((authConfig: any) =>
        configService.setConfig({
          oktaAuth: new OktaAuth({
            ...authConfig,
            redirectUri: `${window.location.origin}/login/callback`,
          }),
        })
      ),
      take(1)
    );
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(OktaAuthModule),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: configInitializer,
      deps: [HttpBackend, OktaAuthConfigService],
      multi: true,
    },
  ],
};
