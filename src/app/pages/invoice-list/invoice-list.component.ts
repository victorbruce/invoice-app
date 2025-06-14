import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../core/models/invoice.model';
import { DropDownComponent } from '../../components/drop-down/drop-down.component';
import { InvoiceCardComponent } from '../../components/invoice-card/invoice-card.component';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice-list',
  imports: [
    RouterOutlet,
    CommonModule,
    DropDownComponent,
    InvoiceCardComponent,
  ],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss',
})
export class InvoiceListComponent {
  invoices: Invoice[] = [];
  invoiceService: InvoiceService = inject(InvoiceService);
  selectedStatuses: string[] = [];
  isMobile = false;
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);

  constructor() {}

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe((data) => {
      this.invoices = data;
    });
    this.updateDeviceType();
  }

  get filteredInvoices(): Invoice[] {
    if (this.selectedStatuses.length === 0) {
      return this.invoices;
    }

    return this.invoices.filter((invoice) =>
      this.selectedStatuses.includes(invoice.status)
    );
  }

  onStatusChange(statuses: string[]) {
    this.selectedStatuses = statuses;
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.updateDeviceType();
  }

  private updateDeviceType(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  openAddInvoiceModal(): void {
    this.router.navigate([{ outlets: { modal: ['add'] } }], {
      relativeTo: this.route.parent,
    });
  }
}
