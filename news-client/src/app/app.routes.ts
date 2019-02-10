import { Routes } from '@angular/router';

// import { AuthGuardService } from './core/services/auth-guard.service';
import { SingleNewsPageComponent } from './single-news-page/single-news-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const newsAppRoutes: Routes = [
  {
    path: 'news',
    component: MainPageComponent,
  },
  {
    path: 'news/create',
    component: EditPageComponent,
  },
  {
    path: 'news/edit/:id',
    component: EditPageComponent,
  },
  {
    path: 'news/:id',
    component: SingleNewsPageComponent,
  },
  {
    path: '',
    redirectTo: 'news',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
