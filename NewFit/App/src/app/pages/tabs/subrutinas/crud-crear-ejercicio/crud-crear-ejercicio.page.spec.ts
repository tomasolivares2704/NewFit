import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudCrearEjercicioPage } from './crud-crear-ejercicio.page';

describe('CrudCrearEjercicioPage', () => {
  let component: CrudCrearEjercicioPage;
  let fixture: ComponentFixture<CrudCrearEjercicioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrudCrearEjercicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
