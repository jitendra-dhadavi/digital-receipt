import { jsPDF } from 'jspdf';
import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../../configs/app.config';
import {
  ReceiptFormValue,
  ReceiptItem,
} from '../../components/receipt-form/receipt-form.type';

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {
  createReceipt(receiptData: ReceiptFormValue) {
    const doc = new jsPDF({
      unit: 'mm',
      format: [80, 150], // Mini receipt size (width, height)
    });
    let y = 10; // Start a little higher to optimize space
  
    // Title
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`${APP_CONFIG.receiptConfig.storeName}`, 40, y, { align: 'center' });
    doc.setFontSize(8);
    doc.text(`${APP_CONFIG.receiptConfig.description}`, 40, y + 5, { align: 'center' });
  
    // Receipt Heading
    y += 10;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('*** PURCHASE RECEIPT ***', 40, y, { align: 'center' });
  
    // Cashier & Date
    y += 8;
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(`Cashier: ${receiptData?.cashier || 'N/A'}`, 5, y);
    doc.text(
      `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      70,
      y,
      { align: 'right' }
    );
  
    // Line Break
    y += 5;
    doc.line(5, y, 75, y);
  
    // Items List
    y += 8;
    receiptData.items!.forEach((item: ReceiptItem, index: number) => {
      doc.text(`${index + 1}. ${item.name}`, 5, y);
      doc.text(`${item.price.toFixed(2)}`, 70, y, { align: 'right' });
      y += 5;
      if (item.discount) {
        doc.text(
          `DISC. ${item.discount}% (Promo) @  ${(
            item.price *
            (1 - item.discount / 100)
          ).toFixed(2)}`,
          10,
          y
        );
        y += 5;
      }
    });
  
    // GST Calculation
    const gstAmount = (receiptData.gstRate! / 100) * receiptData.subtotal!;
    const totalWithGST =
      receiptData.subtotal! + gstAmount - receiptData.loyaltyDiscount!;
  
    // Subtotal, Discount & GST
    y += 5;
    doc.line(5, y, 75, y);
    y += 5;
    doc.text('Subtotal:', 5, y);
    doc.text(`${receiptData.subtotal!.toFixed(2)}`, 70, y, { align: 'right' });
  
    y += 5;
    doc.text('Loyalty Discount:', 5, y);
    doc.text(`${receiptData.loyaltyDiscount!.toFixed(2)}`, 70, y, { align: 'right' });
  
    y += 5;
    doc.text(`GST (${receiptData.gstRate}%):`, 5, y);
    doc.text(`${gstAmount.toFixed(2)}`, 70, y, { align: 'right' });
  
    y += 5;
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL (Incl. GST):', 5, y);
    doc.text(`${totalWithGST.toFixed(2)}`, 70, y, { align: 'right' });
  
    // Payment Details
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.text('Cash Received:', 5, y);
    doc.text(`${receiptData.cash!.toFixed(2)}`, 70, y, { align: 'right' });
  
    // Calculate change or amount due
    const change = receiptData.cash! - totalWithGST;
    let changeText = change >= 0 ? 'Change' : 'Amount Due';
  
    // Add Change or Amount Due field
    y += 5;
    doc.text(changeText, 5, y);
    doc.text(`${Math.abs(change).toFixed(2)}`, 70, y, { align: 'right' });
  
    // Footer
    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.text(`${APP_CONFIG.receiptConfig.receiptFooter}`, 40, y, { align: 'center' });
  
    // Save the PDF
    doc.save('receipt.pdf');
  }
  
}
