import 'node_modules/hammerjs';
import { enableProdMode, LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { LocaleService } from './app/services/locale.service';
if (environment.production) {
  enableProdMode();
  //clear all of console.log
  if (window) {
    window.console.log = function () { };
  }
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

