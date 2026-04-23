import { Component, ElementRef, ViewChild, effect, computed } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {

  @ViewChild('pieCanvas') pieCanvas!: ElementRef;
  @ViewChild('barCanvas') barCanvas!: ElementRef;

  pieChart: any;
  barChart: any;

  monthlySummary = computed(() => {
    const map: Record<string, { income: number, expense: number }> = {};
    this.expenseService.expenses().forEach(e => {
      const rawDate = (e.date as any) instanceof Date ? e.date : (e.date as any)?.toDate?.() ?? new Date(e.date);
      const month = rawDate instanceof Date && !isNaN(rawDate.getTime()) ? rawDate.toISOString().slice(0, 7) : 'Unknown';      if (!map[month]) map[month] = { income: 0, expense: 0 };
      if (e.type === 'income') map[month].income += e.amount;
      else map[month].expense += e.amount;
    });
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  });

  constructor(public expenseService: ExpenseService) {
    effect(() => {
      const expenses = this.expenseService.expenses();
      setTimeout(() => this.buildCharts(expenses), 0);
    });
  }

  buildCharts(expenses: any[]) {
    this.buildPieChart(expenses);
    this.buildBarChart(expenses);
  }

  buildPieChart(expenses: any[]) {
    const categoryMap: Record<string, number> = {};
    expenses.filter(e => e.type === 'expense').forEach(e => {
      categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
    });

    if (this.pieChart) this.pieChart.destroy();
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: Object.keys(categoryMap),
        datasets: [{ data: Object.values(categoryMap) }]
      }
    });
  }

  buildBarChart(expenses: any[]) {
    const income = expenses.filter(e => e.type === 'income').reduce((s, e) => s + e.amount, 0);
    const expense = expenses.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0);

    if (this.barChart) this.barChart.destroy();
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Income', 'Expense'],
        datasets: [{ label: 'Amount', data: [income, expense] }]
      }
    });
  }
}