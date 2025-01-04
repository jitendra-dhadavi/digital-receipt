import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ReceiptItem } from './receipt-form.type';

export const RECEIPT_FORM = new FormGroup({
  cashier: new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  }),
  items: new FormArray([]),
  subtotal: new FormControl<number>(0, {
    nonNullable: true,
    validators: [Validators.required],
  }),
  loyaltyDiscount: new FormControl<number>(0, {
    nonNullable: true,
    validators: [Validators.required],
  }),
  gstRate: new FormControl<number>(0, {
    validators: [Validators.required],
  }),
  cash: new FormControl<number>(0, {
    validators: [Validators.required],
  }),
});


export function createItemFormGroup(item?: ReceiptItem): FormGroup {
  return new FormGroup({
    name: new FormControl(item?.name || '', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    price: new FormControl(item?.price || 0, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    discount: new FormControl(item?.discount || 0),
  });
}
