import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReceiptService } from '../../core/services/receipt.service';
import { MatIconModule } from '@angular/material/icon';

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
  private readonly _fb = inject(FormBuilder);

  receiptForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.receiptForm = this._fb.group({
      cashier: ['', Validators.required],
      items: this._fb.array([]),
      subtotal: ['', Validators.required],
      loyaltyDiscount: ['', Validators.required],
      gstRate: ['', Validators.required], // GST %
      cash: ['', Validators.required],
    });

    // Add predefined items
    const items = [{ name: 'Item 1', price: '' }];

    items.forEach((item) => this.addItem(item));
    this.updateSubtotal();
  }

  get items() {
    return this.receiptForm.get('items') as FormArray;
  }

  addItem(item?: any) {
    this.items.push(
      this._fb.group({
        name: [item?.name || '', Validators.required],
        price: [item?.price || '', Validators.required],
        discount: [item?.discount || ''],
      })
    );
    this.updateSubtotal();
  }

  removeItem(index: number) {
    this.items.removeAt(index);
    this.updateSubtotal();
  }

  updateSubtotal() {
    let subtotal = 0;
    this.items.controls.forEach((item) => {
      const price = item.get('price')?.value || 0;
      const discount = item.get('discount')?.value || 0;
      subtotal += price - (price * discount) / 100;
    });
    this.receiptForm.patchValue({ subtotal });
  }

  generateReceipt() {
    if (this.receiptForm.valid) {
      const currentDateTime = new Date().toLocaleString();
      const receiptData = {
        ...this.receiptForm.value,
        dateTime: currentDateTime,
      };
      this._receiptService.createReceipt(receiptData);
    }
  }
}
