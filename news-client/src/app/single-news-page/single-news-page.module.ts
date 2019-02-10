import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderModule } from '../shared/header';
import { SingleNewsPageComponent } from './single-news-page.component';
import { FooterModule } from '../shared/footer';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    RouterModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [
    SingleNewsPageComponent
  ],
  exports: [
    SingleNewsPageComponent
  ]
})

export class SingleNewsPageModule {}
