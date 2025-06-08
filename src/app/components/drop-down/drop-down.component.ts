import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../shared/pipes';

@Component({
  selector: 'app-drop-down',
  imports: [CommonModule, CapitalizePipe],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.scss',
})
export class DropDownComponent {
  @Input() buttonLabel: string = 'Dropdown';
  @Input() options: string[] = [];
  @Input() selectedOptions: string[] = [];
  @Output() selectedOptionsChange = new EventEmitter<string[]>();

  dropdownOpen = false;

  constructor(private elRef: ElementRef) {}

  toggleDropDown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleOption(option: string): void {
    const index = this.selectedOptions.indexOf(option);
    if (index > -1) {
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(option);
    }

    this.selectedOptionsChange.emit([...this.selectedOptions]);
  }

  isSelected(option: string): boolean {
    return this.selectedOptions.includes(option);
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent): void {
    this.dropdownOpen = false;
  }
}
