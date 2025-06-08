import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { StatusBadgeComponent } from '../../components/status-badge/status-badge.component';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../core/models/invoice.model';
import { FormatDatePipe } from '../../shared/pipes';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-invoice-details',
  imports: [
    CommonModule,
    StatusBadgeComponent,
    FormatDatePipe,
    ConfirmModalComponent,
  ],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.scss',
})
export class InvoiceDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  invoiceService: InvoiceService = inject(InvoiceService);
  invoice: Invoice | undefined;
  isMobile$ = inject(DeviceService).isMobile$;
  invoiceId: string;
  showConfirmModal = false;

  constructor() {
    this.invoiceId = this.route.snapshot.params['id'];
    this.invoiceService.getInvoiceById(this.invoiceId).subscribe((data) => {
      this.invoice = data;
    });
  }

  onDelete(): void {
    this.invoiceService.deleteInvoice(this.invoiceId);
    this.showConfirmModal = false;

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 100);
  }
}
