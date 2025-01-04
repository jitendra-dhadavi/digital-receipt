import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { FORM } from './receipt-form.model';

@Component({
  selector: 'app-receipt-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,

  ],
  templateUrl: './receipt-form.component.html',
  styleUrl: './receipt-form.component.scss'
})
export class ReceiptFormComponent {
  receiptForm = FORM

  generateReceipt() {
    if (this.receiptForm.valid) {
      const receiptData = this.receiptForm.value;
      console.log('receiptData: ', receiptData);
    }
  }
}
