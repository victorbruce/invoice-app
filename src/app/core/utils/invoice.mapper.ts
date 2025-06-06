import { Invoice } from '../models/invoice.model';
import { mapDates } from './date.utils';

export function mapInvoices(rawInvoices: any[]): Invoice[] {
  return rawInvoices.map((invoice) =>
    mapDates(invoice, ['createdAt', 'paymentDue'])
  );
}
