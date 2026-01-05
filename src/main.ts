import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCh7ngPlmJCOQqO7K02JTnlSLhPEmXSUw0',
  authDomain: 'digital-receipt-71d77.firebaseapp.com',
  projectId: 'digital-receipt-71d77',
  storageBucket: 'digital-receipt-71d77.firebasestorage.app',
  messagingSenderId: '809156929774',
  appId: '1:809156929774:web:1f794cf6a64ce0596d2bff',
  measurementId: 'G-LSH25MMQJ9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
