import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DirectedGraphExperimentComponent, DirectedGraphExperimentModule} from '../../projects/directed-graph-experiment/src/public_api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DirectedGraphExperimentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
