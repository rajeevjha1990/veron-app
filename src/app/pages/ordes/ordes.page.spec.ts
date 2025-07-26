import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdesPage } from './ordes.page';

describe('OrdesPage', () => {
  let component: OrdesPage;
  let fixture: ComponentFixture<OrdesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
