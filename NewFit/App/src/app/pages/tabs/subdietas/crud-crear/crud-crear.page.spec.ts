import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudCrearPage } from './crud-crear.page';

describe('CrudCrearPage', () => {
  let component: CrudCrearPage;
  let fixture: ComponentFixture<CrudCrearPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrudCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
