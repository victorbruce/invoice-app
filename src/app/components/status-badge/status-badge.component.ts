import { Component, Input } from '@angular/core';
import { InvoiceStatus } from '../../core/models/invoice.model';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../shared/pipes';

@Component({
  selector: 'app-status-badge',
  imports: [CommonModule, CapitalizePipe],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss',
})
export class StatusBadgeComponent {
  @Input() invoiceStatus!: InvoiceStatus | undefined;
}
