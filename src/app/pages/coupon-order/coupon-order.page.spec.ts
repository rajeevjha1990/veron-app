import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CouponOrderPage } from './coupon-order.page';

describe('CouponOrderPage', () => {
  let component: CouponOrderPage;
  let fixture: ComponentFixture<CouponOrderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
