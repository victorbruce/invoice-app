import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { StatusBadgeComponent } from '../../components/status-badge/status-badge.component';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../core/models/invoice.model';
import { FormatDatePipe } from '../../shared/pipes';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-invoice-details',
  imports: [CommonModule, StatusBadgeComponent, FormatDatePipe],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.scss',
})
export class InvoiceDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  invoiceService: InvoiceService = inject(InvoiceService);
  invoice: Invoice | undefined;
  isMobile$ = inject(DeviceService).isMobile$;

  constructor() {
    const invoiceId = this.route.snapshot.params['id'];
    this.invoiceService.getInvoiceById(invoiceId).subscribe((data) => {
      this.invoice = data;
    });
  }
}
