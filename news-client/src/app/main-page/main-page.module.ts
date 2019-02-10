import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageComponent } from './main-page.component';
import { HeaderModule } from '../shared/header';
import { FooterModule } from '../shared/footer';
import { ToolboxModule } from './toolbox';
import { NewsItemModule } from './news-item';

import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    ToolboxModule,
    NewsItemModule,
    MatButtonModule
  ],
  declarations: [
    MainPageComponent
  ],
  exports: [
    MainPageComponent
  ]
})

export class MainPageModule {}
