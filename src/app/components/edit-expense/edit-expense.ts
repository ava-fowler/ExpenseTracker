import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense';

@Component({
  selector: 'app-edit-expense',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-expense.html',
  styleUrls: ['./edit-expense.css']
})
export class EditExpenseComponent implements OnInit {

  expense!: Expense;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public expenseService: ExpenseService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const found = this.expenseService.getExpenseById(id!);
    if (found) {
      this.expense = found;
    }
  }

  save() {
    const { id, ...data } = this.expense;
    this.expenseService.updateExpense(id!, data);
    this.router.navigate(['/list']);
  }
}
