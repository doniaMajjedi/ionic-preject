import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudBooksPage } from './crud-books.page';

describe('CrudBooksPage', () => {
  let component: CrudBooksPage;
  let fixture: ComponentFixture<CrudBooksPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudBooksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
