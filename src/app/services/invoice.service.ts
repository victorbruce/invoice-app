import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../core/models/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private dataUrl = 'assets/data/data.json';

  constructor(private http: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.dataUrl);
  }

  addInvoice(invoice: Invoice) {}

  updateInvoice(invoiceId: string, data: Invoice) {}

  deleteInvoice(invoiceId: string) {}
}
