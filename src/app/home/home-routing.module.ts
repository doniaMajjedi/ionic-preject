import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { BookDetailsPage } from '../book-details/book-details.page';
import { FavorisPage } from '../favoris/favoris.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'book-details/:id', component: BookDetailsPage },
  {
    path: 'favorites',
    component: FavorisPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
