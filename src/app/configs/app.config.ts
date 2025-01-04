import { AppConfig } from '../types/app.config.types';

export const APP_CONFIG: AppConfig = {
  projectName: 'Digital Receipt',
  receiptConfig: {
    storeName: 'Digital store',
    description: 'A digital receipt management system for your store.',
    logoUrl: '', // Optional field
    contactInfo: {
      phone: '',
      email: '',
      address: '',
    }, // Optional field
    receiptFormat: 'PDF', // Optional field
    receiptFooter: 'THANK YOU FOR SHOPPING!', // Optional field
  },
};
