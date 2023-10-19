import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AntropometricosPage } from './antropometricos.page';

describe('AntropometricosPage', () => {
  let component: AntropometricosPage;
  let fixture: ComponentFixture<AntropometricosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AntropometricosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
