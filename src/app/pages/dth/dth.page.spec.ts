import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DthPage } from './dth.page';

describe('DthPage', () => {
  let component: DthPage;
  let fixture: ComponentFixture<DthPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
