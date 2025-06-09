import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { InvoiceItemsComponent } from '../../components/invoice-items/invoice-items.component';
import { FormDateComponent } from '../../components/form-date/form-date.component';

@Component({
  selector: 'app-new-invoice-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormFieldComponent,
    InvoiceItemsComponent,
    FormDateComponent,
  ],
  templateUrl: './new-invoice-form.component.html',
  styleUrl: './new-invoice-form.component.scss',
})
export class NewInvoiceFormComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private invoiceService: InvoiceService = inject(InvoiceService);

  invoiceForm: FormGroup = this.fb.group({
    senderAddress: this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      postCode: ['', Validators.required],
      country: ['', Validators.required],
    }),
    clientName: ['', Validators.required],
    clientEmail: ['', [Validators.required, Validators.email]],
    clientAddress: this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      postCode: ['', Validators.required],
      country: ['', Validators.required],
    }),
    invoiceDate: [new Date(), Validators.required],
    paymentTerms: ['30', Validators.required],
    description: ['', Validators.required],
    items: this.fb.array([]),
  });

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  get senderStreet(): FormControl {
    return this.invoiceForm.get('senderAddress.street') as FormControl;
  }

  get senderCity(): FormControl {
    return this.invoiceForm.get('senderAddress.city') as FormControl;
  }

  get senderPostCode(): FormControl {
    return this.invoiceForm.get('senderAddress.postCode') as FormControl;
  }

  get senderCountry(): FormControl {
    return this.invoiceForm.get('senderAddress.country') as FormControl;
  }

  get clientName(): FormControl {
    return this.invoiceForm.get('clientName') as FormControl;
  }

  get clientEmail(): FormControl {
    return this.invoiceForm.get('clientEmail') as FormControl;
  }

  get clientStreet(): FormControl {
    return this.invoiceForm.get('clientAddress.street') as FormControl;
  }

  get clientCity(): FormControl {
    return this.invoiceForm.get('clientAddress.city') as FormControl;
  }

  get clientPostCode(): FormControl {
    return this.invoiceForm.get('clientAddress.postCode') as FormControl;
  }

  get clientCountry(): FormControl {
    return this.invoiceForm.get('clientAddress.country') as FormControl;
  }

  get description(): FormControl {
    return this.invoiceForm.get('description') as FormControl;
  }

    get invoiceDate(): FormControl {
    return this.invoiceForm.get('invoiceDate') as FormControl;
  }

  private resetForm(): void {
    this.invoiceForm.reset();
    this.items.clear();
  }

  addItem(): void {
    const itemGroup = this.fb.group({
      name: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      total: [{ value: 0, disabled: true }],
    });

    itemGroup.valueChanges.subscribe((val) => {
      const total = val.quantity! * val.price!;
      itemGroup.get('total')?.setValue(total, { emitEvent: false });
    });

    this.items.push(itemGroup);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  discard(): void {
    this.router.navigate([{ outlets: { modal: null } }], {
      relativeTo: this.route.parent,
    });
    this.resetForm();
  }

  saveAsDraft(): void {
    const invoice = {
      ...this.invoiceForm.getRawValue(),
      status: 'draft',
    };
    this.invoiceService.addInvoice(invoice);
    this.discard();
  }

  onSubmit(): void {
    if (this.invoiceForm.invalid || this.items.length === 0) {
      this.invoiceForm.markAllAsTouched();
      return;
    }

    const invoice = {
      ...this.invoiceForm.getRawValue(),
      status: 'pending',
    };

    this.invoiceService.addInvoice(invoice);
    this.discard();
  }
}
