import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MobileRechargePage } from './mobile-recharge.page';

describe('MobileRechargePage', () => {
  let component: MobileRechargePage;
  let fixture: ComponentFixture<MobileRechargePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileRechargePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
