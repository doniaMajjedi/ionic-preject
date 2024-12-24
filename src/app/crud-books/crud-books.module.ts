import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudBooksPageRoutingModule } from './crud-books-routing.module';
import { env } from 'src/environments/environment';

import { CrudBooksPage } from './crud-books.page';
import { initializeApp } from 'firebase/app'; 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudBooksPageRoutingModule
  ],
  declarations: [CrudBooksPage]
})
export class CrudBooksPageModule {
  constructor(){
    initializeApp(env.firebase); 
  }
}
