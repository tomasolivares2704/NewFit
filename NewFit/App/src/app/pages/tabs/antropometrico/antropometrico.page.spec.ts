import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AntropometricoPage } from './antropometrico.page';

describe('AntropometricoPage', () => {
  let component: AntropometricoPage;
  let fixture: ComponentFixture<AntropometricoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AntropometricoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
