import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgSelectModule } from '@ng-select/ng-select';

import { AppComponent } from './app.component';

import { MainPageModule } from './main-page/main-page.module';
import { SingleNewsPageModule } from './single-news-page';
import { EditPageModule } from './edit-page';
import { NotFoundModule } from './not-found';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    EditPageModule,
    NgSelectModule,
    MainPageModule,
    NotFoundModule,
    SingleNewsPageModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
