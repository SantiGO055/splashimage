import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import "src/styles.css"

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
