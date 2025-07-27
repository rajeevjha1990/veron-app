import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllElectricchargesPage } from './all-electriccharges.page';

describe('AllElectricchargesPage', () => {
  let component: AllElectricchargesPage;
  let fixture: ComponentFixture<AllElectricchargesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllElectricchargesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
