import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrosfitPage } from './crosfit.page';

describe('CrosfitPage', () => {
  let component: CrosfitPage;
  let fixture: ComponentFixture<CrosfitPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrosfitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
