import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrossfitPage } from './crossfit.page';

describe('CrossfitPage', () => {
  let component: CrossfitPage;
  let fixture: ComponentFixture<CrossfitPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrossfitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
