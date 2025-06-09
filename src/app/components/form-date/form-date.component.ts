import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-date',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-date.component.html',
  styleUrl: './form-date.component.scss',
})
export class FormDateComponent {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) label!: string;
}
