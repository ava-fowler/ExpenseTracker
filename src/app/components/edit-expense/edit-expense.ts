import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../../services/expense';
import { Expense } from '../../models/expense';

@Component({
  selector: 'app-edit-expense',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-expense.html',
  styleUrls: ['./edit-expense.css']
})
export class EditExpenseComponent {

  expense!: Expense;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public expenseService: ExpenseService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    const found = this.expenseService.getExpenseById(id);

    if (found) {
      this.expense = { ...found }; // copy so editing doesn't mutate live data
    }
  }

  save() {
    this.expenseService.updateExpense(this.expense);
    this.router.navigate(['/list']);
  }
}
