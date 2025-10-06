import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MobilePostpaidPage } from './mobile-postpaid.page';

describe('MobilePostpaidPage', () => {
  let component: MobilePostpaidPage;
  let fixture: ComponentFixture<MobilePostpaidPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilePostpaidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
