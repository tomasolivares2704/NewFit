import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HitPage } from './hit.page';

describe('HitPage', () => {
  let component: HitPage;
  let fixture: ComponentFixture<HitPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
