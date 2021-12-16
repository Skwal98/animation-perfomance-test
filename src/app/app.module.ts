import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { TestPlugComponent } from './test-plug/test-plug.component';
import { PerfomanceAnimationComponent } from './perfomance-animation/perfomance-animation.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
    TestPlugComponent,
    PerfomanceAnimationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
