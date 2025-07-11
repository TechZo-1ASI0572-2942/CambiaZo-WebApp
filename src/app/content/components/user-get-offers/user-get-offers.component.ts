import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { OffersService } from "../../service/offers/offers.service";
import { DialogDeniedOfferComponent } from "../../../public/components/dialog-denied-offer/dialog-denied-offer.component";
import { DialogSuccessfulExchangeComponent } from "../../../public/components/dialog-successful-exchange/dialog-successful-exchange.component";
import {MatCard, MatCardAvatar, MatCardContent, MatCardFooter, MatCardHeader} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {NgForOf,NgIf} from "@angular/common";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {CambiazoStateService} from "../../states/cambiazo-state.service";

@Component({
  selector: 'app-user-get-offers',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardFooter,
    MatIcon,
    NgForOf,
    MatCardAvatar,
    MatProgressSpinnerModule,
    NgIf
  ],
  templateUrl: './user-get-offers.component.html',
  styleUrl: './user-get-offers.component.css'
})
export class UserGetOffersComponent implements OnInit {
  @Output() checkEmpty = new EventEmitter<boolean>();
  offers: any[] = [];
  private readonly cambiazoState: CambiazoStateService = inject(CambiazoStateService);
  districts = this.cambiazoState.districts;
  loading: boolean = false;

  constructor(
    private offersService: OffersService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllOffers();
  }

  getAllOffers(): void {
    const userId = localStorage.getItem('id');
    if (!userId) return;

    this.offersService.getAllOffersByUserChangeId(userId).subscribe((data: any[]) => {
      const filtered = data.filter((offer: any) => offer.status === 'Pendiente');
      this.checkEmpty.emit(filtered.length === 0);
      this.offers = filtered.map((offer:any) => ({
        ...offer,
        districtName: this.districts().find(d => d.id === offer.productOwn.districtId)?.name,
      }));
    });
  }

  setStatusAccepted(offerId: number) {
     this.loading = true;
  this.offersService.updateOfferStatus(offerId.toString(), 'Aceptado').subscribe(() => {
    const offer = this.offers.find(o => o.id === offerId);
    this.offers = this.offers.filter(o => o.id !== offerId);
    if (offer) {
      this.dialog.open(DialogSuccessfulExchangeComponent, {
        data: {
          name: offer.userOwn.name,
          profilePicture: offer.userOwn.profilePicture,
          phone: offer.userOwn.phoneNumber,
          username: offer.userOwn.username
        },
        disableClose: true
      });
    }
    this.loading = false;
  }, () => {
    this.loading = false;
  });
  }

  setStatusDenied(offerId: number) {
    const dialogRef = this.dialog.open(DialogDeniedOfferComponent, { disableClose: true });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.loading = true;
      this.offersService.updateOfferStatus(offerId.toString(), 'Denegado').subscribe(() => {
        this.offers = this.offers.filter(o => o.id !== offerId);
        this.loading = false;
      }, () => {
        this.loading = false;
      });
    }
  });
  }
}
