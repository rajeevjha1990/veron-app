import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PendingOrderPage } from './pending-order.page';

describe('PendingOrderPage', () => {
  let component: PendingOrderPage;
  let fixture: ComponentFixture<PendingOrderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
