import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HipocaloricoPage } from './hipocalorico.page';

describe('HipocaloricoPage', () => {
  let component: HipocaloricoPage;
  let fixture: ComponentFixture<HipocaloricoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HipocaloricoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
