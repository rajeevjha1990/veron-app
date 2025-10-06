import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElectricityBillPage } from './electricity-bill.page';

describe('ElectricityBillPage', () => {
  let component: ElectricityBillPage;
  let fixture: ComponentFixture<ElectricityBillPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricityBillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
