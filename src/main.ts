import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

import('./app/app.module')
.then(x => platformBrowserDynamic().bootstrapModule(x.AppModule))
.catch(err => console.error(err));
