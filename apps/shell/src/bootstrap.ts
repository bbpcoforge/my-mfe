import { bootstrapApplication } from '@angular/platform-browser';
import { getAppConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

getAppConfig().then((config) =>
  bootstrapApplication(AppComponent, config).catch((err) => console.error(err))
);
/*
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
*/
