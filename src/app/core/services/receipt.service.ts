import { jsPDF } from 'jspdf';
import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../../configs/app.config';

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {
  createReceipt(receiptData: any) {
    const doc = new jsPDF();
    let y = 20;

    // Title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`${APP_CONFIG.receiptConfig.storeName}`, 105, y, {
      align: 'center',
    });
    doc.setFontSize(10);
    doc.text(`${APP_CONFIG.receiptConfig.description}`, 105, y + 5, {
      align: 'center',
    });

    // Receipt Heading
    y += 15;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('*** RECEIPT ***', 105, y, { align: 'center' });

    // Cashier & Date
    y += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Cashier: ${receiptData?.cashier || 'N/A'}`, 20, y);
    doc.text(
      `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      140,
      y
    );

    // Line Break
    y += 5;
    doc.line(20, y, 190, y);

    // Items List
    y += 10;
    receiptData.items.forEach((item: any, index: number) => {
      doc.text(`${index + 1}. ${item.name}`, 20, y);
      doc.text(`${item.price.toFixed(2)}`, 170, y, { align: 'right' });
      y += 6;
      if (item.discount) {
        doc.text(
          `DISC. ${item.discount}% (Special Promo) @  ${(
            item.price *
            (1 - item.discount / 100)
          ).toFixed(2)}`,
          30,
          y
        );
        y += 6;
      }
    });

    // GST Calculation
    const gstAmount = (receiptData.gstRate / 100) * receiptData.subtotal;
    const totalWithGST =
      receiptData.subtotal + gstAmount - receiptData.loyaltyDiscount;

    // Subtotal, Discount & GST
    y += 5;
    doc.line(20, y, 190, y);
    y += 6;
    doc.text('Subtotal:', 20, y);
    doc.text(`${receiptData.subtotal.toFixed(2)}`, 170, y, { align: 'right' });

    y += 6;
    doc.text('Loyalty Discount:', 20, y);
    doc.text(`${receiptData.loyaltyDiscount.toFixed(2)}`, 170, y, {
      align: 'right',
    });

    y += 6;
    doc.text(`GST (${receiptData.gstRate}%):`, 20, y);
    doc.text(`${gstAmount.toFixed(2)}`, 170, y, { align: 'right' });

    y += 6;
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL (Incl. GST):', 20, y);
    doc.text(`${totalWithGST.toFixed(2)}`, 170, y, { align: 'right' });

    // Payment Details
    y += 10;
    doc.setFont('helvetica', 'normal');
    doc.text('Cash:', 20, y);
    doc.text(`${receiptData.cash.toFixed(2)}`, 170, y, { align: 'right' });

    // Calculate change or amount due
    const change = receiptData.cash - totalWithGST;
    let changeText = '';

    if (change >= 0) {
      changeText = `Change`;
    } else {
      changeText = `Amount Due`;
    }

    // Add Change or Amount Due field
    y += 6;
    doc.text(changeText, 20, y);
    doc.text(
      `${change >= 0 ? change.toFixed(2) : Math.abs(change).toFixed(2)}`,
      170,
      y,
      { align: 'right' }
    );

    // Footer
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text(`${APP_CONFIG.receiptConfig.receiptFooter}`, 105, y, {
      align: 'center',
    });

    // Save the PDF
    doc.save('receipt.pdf');
  }
}
