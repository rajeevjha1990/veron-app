import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FasttagPage } from './fasttag.page';

describe('FasttagPage', () => {
  let component: FasttagPage;
  let fixture: ComponentFixture<FasttagPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FasttagPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
