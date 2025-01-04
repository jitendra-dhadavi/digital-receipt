import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReceiptService } from '../../core/services/receipt.service';
import { MatIconModule } from '@angular/material/icon';
import {
  createItemFormGroup,
  RECEIPT_FORM,
} from './receipt-form.model';
import { ReceiptItem } from './receipt-form.type';

@Component({
  selector: 'app-receipt-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './receipt-form.component.html',
  styleUrl: './receipt-form.component.scss',
})
export class ReceiptFormComponent implements OnInit {
  private readonly _receiptService = inject(ReceiptService);

  receiptForm = RECEIPT_FORM;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    // Add predefined items
    const items: ReceiptItem[] = [{ name: 'Item 1', price: 0 }];

    items.forEach((item) => this.addItem(item));
    this.updateSubtotal();
  }

  get items(): FormArray<
    FormGroup<{
      name: FormControl<string>;
      price: FormControl<number>;
      discount: FormControl<number>;
    }>
  > {
    return this.receiptForm.get('items') as FormArray;
  }

  addItem(item?: ReceiptItem) {
    this.items.push(createItemFormGroup(item));
    this.updateSubtotal();
  }

  removeItem(index: number) {
    this.items.removeAt(index);
    this.updateSubtotal();
  }

  updateSubtotal() {
    let subtotal = 0;
    this.items.controls.forEach((item) => {
      const price = item.value.price || 0;
      const discount = item.value.discount || 0;
      subtotal += price - (price * discount) / 100;
    });
    this.receiptForm.patchValue({ subtotal });
  }

  generateReceipt() {
    if (this.receiptForm.valid) {
      const receiptData = {
        ...this.receiptForm.getRawValue(),
      };
      this._receiptService.createReceipt(receiptData);
    }
  }
}
