export interface ContactInfo {
    phone: string;
    email: string;
    address: string;
  }
  
  export interface ReceiptConfig {
    storeName: string;
    description: string;
    logoUrl?: string;
    contactInfo?: ContactInfo;
    receiptFormat?: 'PDF' | 'HTML' | 'Text'; // You can extend the formats as needed
    receiptFooter?: string;
  }
  
  export interface AppConfig {
    projectName: string;
    receiptConfig: ReceiptConfig;
  }