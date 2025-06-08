import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, BehaviorSubject, Observable } from 'rxjs';
import { Invoice } from '../core/models/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private dataUrl = 'assets/data/data.json';
  private invoicesSubject: BehaviorSubject<Invoice[]> = new BehaviorSubject<
    Invoice[]
  >([]);
  invoices$ = this.invoicesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInvoices();
  }

  private loadInvoices(): void {
    const stored = localStorage.getItem('invoices');

    if (stored) {
      const invoices = JSON.parse(stored);
      this.invoicesSubject.next(invoices);
    } else {
      this.http.get<Invoice[]>(this.dataUrl).subscribe((data) => {
        this.invoicesSubject.next(data);
        localStorage.setItem('invoices', JSON.stringify(data));
      });
    }
  }

  getInvoices(): Observable<Invoice[]> {
    return this.invoices$;
  }

  getInvoiceById(id: string): Observable<Invoice | undefined> {
    return this.invoices$.pipe(
      map((invoices) => invoices.find((invoice) => invoice.id === id))
    );
  }

  addInvoice(invoice: Invoice) {}

  updateInvoice(invoiceId: string, data: Invoice) {}

  deleteInvoice(invoiceId: string) {
    const current = this.invoicesSubject.getValue();
    const updated = current.filter((invoice) => invoice.id !== invoiceId);
    this.invoicesSubject.next(updated);
    localStorage.setItem('invoices', JSON.stringify(updated));
  }
}
