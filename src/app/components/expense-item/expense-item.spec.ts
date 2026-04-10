import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseItemComponent } from './expense-item';

describe('ExpenseItemComponent', () => {
  let component: ExpenseItemComponent;
  let fixture: ComponentFixture<ExpenseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseItemComponent);
    component = fixture.componentInstance;
    component.expense = {
      id: '1',
      title: 'Test Expense',
      amount: 100,
      category: 'Work'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
