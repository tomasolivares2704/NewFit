import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdFoodPage } from './id-food.page';

describe('IdFoodPage', () => {
  let component: IdFoodPage;
  let fixture: ComponentFixture<IdFoodPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IdFoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
