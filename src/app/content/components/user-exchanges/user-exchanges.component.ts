import { Component } from '@angular/core';
import { CompleteExchangesComponent } from "../complete-exchanges/complete-exchanges.component";
import {MessageBoxComponentComponent} from "../message-box-component/message-box-component.component";
import {NgIf} from "@angular/common";
import {MatAnchor, MatButton} from "@angular/material/button";
import { PendingExchangeComponent } from "../pending-exchange/pending-exchange.component";

@Component({
  selector: 'app-user-exchanges',
  standalone: true,
  imports: [
    CompleteExchangesComponent,
    MessageBoxComponentComponent,
    NgIf,
    MatAnchor,
    MatButton,
    PendingExchangeComponent
],
  templateUrl: './user-exchanges.component.html',
  styleUrl: './user-exchanges.component.css'
})
export class UserExchangesComponent {
  showSent: boolean = true;

  sentOffersEmpty = false;
  getOffersEmpty  = false;

  sentChecked = false;
  getChecked  = false;

  showSentOffers() {
    this.showSent = true;
  }

  showGetOffers() {
    this.showSent = false;
  }

  onSentOffersChecked(isEmpty: boolean) {
    this.sentOffersEmpty = isEmpty;
    this.sentChecked = true;
  }

  onGetOffersChecked(isEmpty: boolean) {
    this.getOffersEmpty = isEmpty;
    this.getChecked = true;
  }
}
