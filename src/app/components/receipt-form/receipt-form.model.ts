import { FormGroup, FormControl, Validators } from "@angular/forms";

export const FORM = new FormGroup({
    customerName: new FormControl('', Validators.required),
    itemDescription: new FormControl('', Validators.required),
    amount: new FormControl(0, Validators.required),
    quantity: new FormControl(0, Validators.required)
  });