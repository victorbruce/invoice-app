import { Routes } from '@angular/router';
import { InvoiceListComponent } from './pages/invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './pages/invoice-details/invoice-details.component';
import { NewInvoiceFormComponent } from './pages/new-invoice-form/new-invoice-form.component';
import { EditInvoiceFormComponent } from './pages/edit-invoice-form/edit-invoice-form.component';

export const routes: Routes = [
  { path: '', component: InvoiceListComponent, title: 'Invoices' },
  {
    path: 'invoices/new',
    component: NewInvoiceFormComponent,
    title: 'New Invoice Page',
  },
  {
    path: 'invoices/:id',
    component: InvoiceDetailsComponent,
    title: 'Invoice Details Page',
  },

  {
    path: 'invoices/:id/edit',
    component: EditInvoiceFormComponent,
    title: 'Edit Invoice Page',
  },
];
