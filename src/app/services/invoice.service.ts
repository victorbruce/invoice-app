import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, throwError } from 'rxjs';
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

  getInvoiceById(id: string): Observable<Invoice | undefined> {
    return this.http.get<Invoice[]>(this.dataUrl).pipe(
      switchMap((invoices: Invoice[]) => {
        const invoice = invoices.find((inv) => inv.id === id);

        return invoice
          ? new Observable<Invoice>((obs) => {
              obs.next(invoice);
              obs.complete();
            })
          : throwError(() => new Error(`Invoice with ID ${id} not found`));
      })
    );
  }

  addInvoice(invoice: Invoice) {}

  updateInvoice(invoiceId: string, data: Invoice) {}

  deleteInvoice(invoiceId: string) {}
}
