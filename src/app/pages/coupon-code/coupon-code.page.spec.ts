import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CouponCodePage } from './coupon-code.page';

describe('CouponCodePage', () => {
  let component: CouponCodePage;
  let fixture: ComponentFixture<CouponCodePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
