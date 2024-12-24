import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudBooksPage } from './crud-books.page';

const routes: Routes = [
  {
    path: '',
    component: CrudBooksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudBooksPageRoutingModule {}
