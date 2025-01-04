import { RECEIPT_FORM } from "./receipt-form.model";

export type ReceiptFormValue = typeof RECEIPT_FORM.value;

export interface ReceiptItem {
  name: string;
  price: number;
  discount?: number;
}