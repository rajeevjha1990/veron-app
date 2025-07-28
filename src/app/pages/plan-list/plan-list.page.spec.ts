import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanListPage } from './plan-list.page';

describe('PlanListPage', () => {
  let component: PlanListPage;
  let fixture: ComponentFixture<PlanListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
