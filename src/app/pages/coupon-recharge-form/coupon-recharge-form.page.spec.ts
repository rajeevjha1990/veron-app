import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CouponRechargeFormPage } from './coupon-recharge-form.page';

describe('CouponRechargeFormPage', () => {
  let component: CouponRechargeFormPage;
  let fixture: ComponentFixture<CouponRechargeFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponRechargeFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
