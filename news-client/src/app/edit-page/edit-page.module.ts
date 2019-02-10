import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { EditPageComponent } from './edit-page.component';
import { HeaderModule } from '../shared/header';
import { FooterModule } from '../shared/footer';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HeaderModule,
    FooterModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule
  ],
  declarations: [
    EditPageComponent
  ],
  exports: [
    EditPageComponent
  ]
})

export class EditPageModule {}
