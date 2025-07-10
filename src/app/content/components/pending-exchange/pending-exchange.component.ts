import { Component, OnInit, EventEmitter, inject, Output } from '@angular/core';
import { OffersService } from '../../service/offers/offers.service';
import { PostsService} from "../../service/posts/posts.service";
import { UsersService } from '../../service/users/users.service';
import {Offers} from "../../model/offers/offers.model";
import { RouterLink } from "@angular/router";
import {
  MatCard,
  MatCardAvatar,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgStyle} from "@angular/common";
import {Products} from "../../model/products/products.model";
import {CambiazoStateService} from "../../states/cambiazo-state.service";

@Component({
  selector: 'app-pending-exchange',
  standalone: true,
  imports: [
    MatCard,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatIcon,
    NgForOf,
    NgStyle,
    MatCardFooter,
    RouterLink
  ],
  templateUrl: './pending-exchange.component.html',
  styleUrl: './pending-exchange.component.css'
})
export class PendingExchangeComponent {
 @Output() checkEmpty = new EventEmitter<boolean>();
 
 offers: any[] = [];
   private readonly cambiazoState: CambiazoStateService = inject(CambiazoStateService);
   districts = this.cambiazoState.districts;
 
   constructor(private offersService: OffersService, private postService: PostsService) {}
  
   ngOnInit() {
     this.getAllOffers();
   }
 
   getAllOffers(): void {
     const userId = localStorage.getItem('id');
     if (!userId) return;

     this.offersService.getAllOffersByUserOwnId(userId).pipe().subscribe(result => {
       this.offers = result.map((offer:any) => ({
         ...offer,
         districtName: this.districts().find(d => d.id === offer.productChange.districtId)?.name,
       }));
     });
   }
 
   getStatusStyles(status: string) {
     switch (status) {
       case 'Aceptado':
         return { color: '#41DB0B', backgroundColor: '#EAFFDD', border: '1px solid #41DB0B', borderRadius: '10px', width: '8.5rem', height: '2.2rem', textAlign: 'center' };
       case 'Pendiente':
         return { color: '#FFA22A', backgroundColor: '#FFF2CC', border: '1px solid #FFA22A', borderRadius: '10px', width: '8.5rem', height: '2.2rem', textAlign: 'center' };
       case 'Rechazado':
         return { color: '#FF502A', backgroundColor: '#FFD7B9', border: '1px solid #FF502A', borderRadius: '10px', width: '8.5rem', height: '2.2rem', textAlign: 'center' };
       default:
         return {};
     }
   }

}
