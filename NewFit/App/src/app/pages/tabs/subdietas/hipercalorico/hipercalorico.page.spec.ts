import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HipercaloricoPage } from './hipercalorico.page';

describe('HipercaloricoPage', () => {
  let component: HipercaloricoPage;
  let fixture: ComponentFixture<HipercaloricoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HipercaloricoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
