import { Component, OnInit, EventEmitter, inject, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule} from "@angular/material/icon";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {OffersService} from "../../service/offers/offers.service";

import {ReviewsService} from "../../service/reviews/reviews.service";
import { ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms";
import {DialogEditPostComponent} from "../../../public/components/dialog-edit-post/dialog-edit-post.component";
import {
  MatCard,
  MatCardAvatar,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-complete-exchanges',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    NgForOf,
    NgIf,
    MatIcon,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    NgStyle,
    MatCard,
    MatCardAvatar,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardTitle,
  ],
  templateUrl: './complete-exchanges.component.html',
  styleUrl: './complete-exchanges.component.css'
})
export class CompleteExchangesComponent implements OnInit{
 @Output() checkEmpty = new EventEmitter<boolean>();
  arr: any[] = [
  {
    status: 'Aceptado',
    productOwn: {
      image: 'https://www.dzoom.org.es/wp-content/uploads/2021/06/fotografia-movil-versus-camara2-810x540.jpg',
      name: 'Cámara Fotográfica'
    },
    productChange: {
      image: 'https://i.pinimg.com/originals/60/8b/2e/608b2e06097f31739a973aeac588c551.jpg',
      name: 'Bicicleta'
    },
    userChange: {
      name: 'Carlos López'
    },
    reviewExisted: false
  },
  {
    status: 'Aceptado',
    productOwn: {
      image: 'https://mymodernmet.com/wp/wp-content/uploads/2022/02/how-to-draw-a-book-1.jpg',
      name: 'Libro de ciencia ficción'
    },
    productChange: {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScxTOeolC_Fs4i1SQAP5q4rjEnOMTJW5WeIw&s',
      name: 'Juego de mesa'
    },
    userChange: {
      name: 'Ana Torres'
    },
    reviewExisted: true
  },
  {
    status: 'Pendiente',
    productOwn: {
      image: 'https://i.blogs.es/1fdc17/google-pixel-buds-pro-6/1366_2000.jpg',
      name: 'Auriculares Bluetooth'
    },
    productChange: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/3-Tasten-Maus_Microsoft.jpg/640px-3-Tasten-Maus_Microsoft.jpg',
      name: 'Mouse Gamer'
    },
    userChange: {
      name: 'Luis Pérez'
    },
    reviewExisted: false
  }
];

  userId: number = Number(localStorage.getItem('id'));
  offers: any[] = [];

  maxRating: number = 5;
  selectedStar:number[]=[];
  maxRatingArr:any=[];
  previousSelection:number[]=[];

  inputs: any[] = [];

  constructor(private dialogReviewPost: MatDialog,private offersService:OffersService, private reviewService:ReviewsService) {}


  ngOnInit() {
    this.maxRatingArr=Array(this.maxRating).fill(0);
    this.getFinishedOffers();
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


  getFinishedOffers() {
    if (!this.userId) return;
    this.offersService.getFinishedByUserId(this.userId.toString()).subscribe((data: any[]) => {
      this.offers = data;

      this.offers.forEach((offer) => {

        if(offer.userOwn.id !== this.userId) {

          const temP = offer.productOwn;
          offer.productOwn = offer.productChange;
          offer.productChange = temP;

          const temU = offer.userOwn;
          offer.userOwn = offer.userChange;
          offer.userChange = temU;
        }

      this.reviewService.getReviewByAuthorAndExchange(this.userId.toString(),offer.id).subscribe((res) => {
        offer.reviewExisted = res.existReview;
      });

      });

      this.offers = this.arr;
    });
  }

  HandleMouseEnter(indexRate:number,indexOffer:number){
    this.selectedStar[indexOffer]=indexRate+1;
  }

  HandleMouseLeave(indexOffer:number){
    if(this.previousSelection[indexOffer]!==0) {
      this.selectedStar[indexOffer] = this.previousSelection[indexOffer];
    }else {
      this.selectedStar[indexOffer]=0;
    }
  }

  Rating(indexRate:number,indexOffer:number){
    this.selectedStar[indexOffer]=indexRate+1;
    this.previousSelection[indexOffer]=this.selectedStar[indexOffer];
  }

  sendReview(indexOffer: number, otherId: number, exchangeId: number) {
    if (!this.selectedStar[indexOffer]) {
      alert("Por favor seleccione una puntuación de estrellas");
      return;
    }
    const reviewPayload = {
      message:        this.inputs[indexOffer] || "",
      rating:         this.selectedStar[indexOffer],
      state:          "COMPLETED",
      exchangeId:     exchangeId,
      userAuthorId:   this.userId,
      userReceptorId: otherId
    };

    this.reviewService.postReview(reviewPayload)
      .subscribe(() => {
        this.dialogReviewPost.open(DialogEditPostComponent, { disableClose: true });
      });
  }

}
