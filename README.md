# Schematics - jvitor83/ionic-primeng-crud-schematics

## Your Project Configurations (OPTIONAL)

### Install the tools
- Install [Node.js](https://nodejs.org/en/download/)
```bash
npm i -g @angular/cli ionic
```

### Create your project
```bash
ionic start --type=angular MyProject
```

### Add Dependencies
```bash
npm install --save @angular/animations@6.1.1 @ngrx/effects @ngrx/entity @ngrx/store @ngrx/store-devtools ngrx-data primeng primeicons
```

### Add styles at `angular.json`
> primeng requirement
```json
            "styles": [ 
              {"input": "node_modules/primeicons/primeicons.css"},
              {"input": "node_modules/primeng/resources/themes/nova-light/theme.css"},
              {"input": "node_modules/primeng/resources/primeng.min.css"},
              {"input": "src/theme/variables.scss"},
              {"input": "src/global.scss"}
            ]
```

### Add the missing imports to `app.module.ts`
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

```

## Install:
```bash
npm install --save-dev jvitor83/ionic-primeng-crud-schematics
```

## Configure:
```bash
ng config cli.defaultCollection @jvitor83/ionic-primeng-crud-schematics
```

## Generate:
```bash
ng g page entity
```
