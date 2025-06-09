import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-invoice-items',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './invoice-items.component.html',
  styleUrl: './invoice-items.component.scss',
})
export class InvoiceItemsComponent {
  @Input({ required: true }) items!: FormArray;
  @Output() itemRemoved = new EventEmitter<number>();

  constructor(private fb: FormBuilder) {}

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
    this.itemRemoved.emit(index);
  }
}
