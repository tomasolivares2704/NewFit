import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudVerEjerciciosPage } from './crud-ver-ejercicios.page';

describe('CrudVerEjerciciosPage', () => {
  let component: CrudVerEjerciciosPage;
  let fixture: ComponentFixture<CrudVerEjerciciosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrudVerEjerciciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
