import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudPutPage } from './crud-put.page';

describe('CrudPutPage', () => {
  let component: CrudPutPage;
  let fixture: ComponentFixture<CrudPutPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrudPutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
