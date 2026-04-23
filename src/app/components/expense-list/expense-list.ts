import { Component, computed, signal } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-list.html',
  styleUrls: ['./expense-list.css']
})
export class ExpenseListComponent {

  searchTerm = signal('');
  selectedCategory = signal('');
  startDate = signal('');
  endDate = signal('');
  minAmount = signal<number | null>(null);
  maxAmount = signal<number | null>(null);

  filteredExpenses = computed(() => {
  return this.expenseService.expenses().filter(e => {
      const rawDate = (e.date as any) instanceof Date ? e.date : (e.date as any)?.toDate?.() ?? new Date(e.date);
      const dateStr = rawDate instanceof Date && !isNaN(rawDate.getTime()) ? rawDate.toISOString().slice(0, 10) : '';

      const matchesSearch = e.title.toLowerCase().includes(this.searchTerm().toLowerCase());
    const matchesCategory = this.selectedCategory() ? e.category === this.selectedCategory() : true;
    const matchesStart = this.startDate() ? dateStr >= this.startDate() : true;
    const matchesEnd = this.endDate() ? dateStr <= this.endDate() : true;
    const matchesMin = this.minAmount() !== null ? e.amount >= this.minAmount()! : true;
    const matchesMax = this.maxAmount() !== null ? e.amount <= this.maxAmount()! : true;
    return matchesSearch && matchesCategory && matchesStart && matchesEnd && matchesMin && matchesMax;
  });
});

  constructor(
    public expenseService: ExpenseService,
    private router: Router
  ) {}

  edit(id: string) {
    this.router.navigate(['/edit', id]);
  }

  delete(id: string) {
    this.expenseService.deleteExpense(id);
  }
}