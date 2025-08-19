import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TermconditionPage } from './termcondition.page';

describe('TermconditionPage', () => {
  let component: TermconditionPage;
  let fixture: ComponentFixture<TermconditionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TermconditionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
