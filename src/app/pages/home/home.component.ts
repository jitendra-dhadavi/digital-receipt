import { Component } from '@angular/core';
import { ReceiptFormComponent } from '../../components/receipt-form/receipt-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReceiptFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
