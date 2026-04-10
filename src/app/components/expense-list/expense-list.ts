import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense';
import { ExpenseItemComponent } from '../expense-item/expense-item';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, ExpenseItemComponent],
  templateUrl: './expense-list.html',
  styleUrls: ['./expense-list.css'],
})

export class ExpenseListComponent {

  constructor(public expenseService: ExpenseService) {}

}
