import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudListEjerciciosPage } from './crud-list-ejercicios.page';

describe('CrudListEjerciciosPage', () => {
  let component: CrudListEjerciciosPage;
  let fixture: ComponentFixture<CrudListEjerciciosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrudListEjerciciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
