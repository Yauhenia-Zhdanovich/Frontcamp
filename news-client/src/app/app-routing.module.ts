import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { newsAppRoutes } from './app.routes';

@NgModule({
  imports: [
    RouterModule.forRoot(newsAppRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
