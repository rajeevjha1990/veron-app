import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllMobilechargesPage } from './all-mobilecharges.page';

describe('AllMobilechargesPage', () => {
  let component: AllMobilechargesPage;
  let fixture: ComponentFixture<AllMobilechargesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMobilechargesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
