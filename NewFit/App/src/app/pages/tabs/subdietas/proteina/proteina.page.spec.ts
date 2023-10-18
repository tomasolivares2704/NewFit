import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProteinaPage } from './proteina.page';

describe('ProteinaPage', () => {
  let component: ProteinaPage;
  let fixture: ComponentFixture<ProteinaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProteinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
