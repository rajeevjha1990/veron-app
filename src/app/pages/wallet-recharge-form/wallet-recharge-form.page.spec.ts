import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletRechargeFormPage } from './wallet-recharge-form.page';

describe('WalletRechargeFormPage', () => {
  let component: WalletRechargeFormPage;
  let fixture: ComponentFixture<WalletRechargeFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletRechargeFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
