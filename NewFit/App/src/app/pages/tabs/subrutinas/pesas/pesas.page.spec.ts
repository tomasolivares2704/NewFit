import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PesasPage } from './pesas.page';

describe('PesasPage', () => {
  let component: PesasPage;
  let fixture: ComponentFixture<PesasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PesasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
