import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { <%= classify(name) %>Page } from './<%= dasherize(name) %>.page';
import { <%= classify(name) %>ChangePage } from './<%= dasherize(name) %>-change/<%= dasherize(name) %>.change-page';
import { <%= classify(name) %>ViewPage } from './<%= dasherize(name) %>-view/<%= dasherize(name) %>.view-page';

import { EntityMetadataMap, NgrxDataModule, DefaultDataServiceConfig } from "ngrx-data";

import { TableModule } from "primeng/table";
import { PaginatorModule } from 'primeng/paginator';

const routes: Routes = [
  {
    path: '',
    component: <%= classify(name) %>Page
  },
  {
    path: 'create',
    component: <%= classify(name) %>ChangePage
  },
  {
    path: ':<%= camelize(name) %>Id/edit',
    component: <%= classify(name) %>ChangePage
  },
  {
    path: ':<%= camelize(name) %>Id',
    component: <%= classify(name) %>ViewPage
  }
];

export const entityMetadata: EntityMetadataMap = {
  <%= classify(name) %>: { selectId: model => model.id } // mapping to the unique identifier
};

// mapping the Entity to the Path
export const pluralNames = { <%= classify(name) %>: "<%= classify(name) %>" };

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: "https://api.openbrewerydb.org" // default root path to the server's web api
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TableModule,
    PaginatorModule,
    NgrxDataModule.forRoot({
      entityMetadata: entityMetadata,
      pluralNames: pluralNames,
    })
  ],
  declarations: [<%= classify(name) %>Page, <%= classify(name) %>ChangePage, <%= classify(name) %>ViewPage],
  providers: [ { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig } ]
})
export class <%= classify(name) %>PageModule {}
