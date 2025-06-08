import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormatDatePipe, CapitalizePipe } from '../../shared/pipes';
import { Invoice } from '../../core/models/invoice.model';

@Component({
  selector: 'app-invoice-card',
  imports: [CommonModule, CurrencyPipe, FormatDatePipe, CapitalizePipe],
  templateUrl: './invoice-card.component.html',
  styleUrl: './invoice-card.component.scss',
})
export class InvoiceCardComponent {
  @Input() invoice!: Invoice;

  constructor(private router: Router) {}

  navigateToDetails(event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(['/invoices', this.invoice.id]);
  }

  handleCardClick(event: MouseEvent) {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      this.router.navigate(['/invoices', this.invoice.id]);
    }
  }
}
