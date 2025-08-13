import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerificationPagePage } from './verification-page.page';

describe('VerificationPagePage', () => {
  let component: VerificationPagePage;
  let fixture: ComponentFixture<VerificationPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
