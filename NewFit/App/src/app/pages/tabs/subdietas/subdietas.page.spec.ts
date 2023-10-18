import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubdietasPage } from './subdietas.page';

describe('SubdietasPage', () => {
  let component: SubdietasPage;
  let fixture: ComponentFixture<SubdietasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SubdietasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
