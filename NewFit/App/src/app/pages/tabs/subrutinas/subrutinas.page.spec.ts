import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubrutinasPage } from './subrutinas.page';

describe('SubrutinasPage', () => {
  let component: SubrutinasPage;
  let fixture: ComponentFixture<SubrutinasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SubrutinasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
