import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudListPage } from './crud-list.page';

describe('CrudListPage', () => {
  let component: CrudListPage;
  let fixture: ComponentFixture<CrudListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrudListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
