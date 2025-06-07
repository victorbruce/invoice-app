import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../core/models/invoice.model';
// import { mapInvoices } from '../../core/utils';
import { FormatDatePipe, CapitalizePipe } from '../../shared/pipes';

@Component({
  selector: 'app-invoice-list',
  imports: [CommonModule, FormatDatePipe, CurrencyPipe, CapitalizePipe],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss',
})
export class InvoiceListComponent {
  invoices: Invoice[] = [];
  totalInvoices: number = 0;
  invoiceService: InvoiceService = inject(InvoiceService);

  constructor() {}

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe((data) => {
      this.invoices = data;
      this.totalInvoices = this.invoices.length;
    });
  }
}
