import { Component } from '@angular/core';
import { ExpenseService } from '../../services/expense';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {

  constructor(public expenseService: ExpenseService) {}

}
