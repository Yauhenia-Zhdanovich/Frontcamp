import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NewsItemComponent } from './news-item.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule
  ],
  declarations: [
    NewsItemComponent
  ],
  exports: [
    NewsItemComponent
  ]
})

export class NewsItemModule {}
