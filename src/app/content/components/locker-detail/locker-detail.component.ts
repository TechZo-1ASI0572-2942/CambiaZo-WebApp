import { Component } from '@angular/core';
import { NgxDropzoneModule } from 'ngx-dropzone'
import { NgForOf, NgIf } from '@angular/common'
import { MatTabsModule } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon'; 
import { ExchangeLockerService } from '../../service/exchange-locker/exchange-locker.service';
import { ActivatedRoute } from '@angular/router';
import { ExchangeLockerDetailsByUser } from '../../model/exchange-locker/exchange-locker.model';
import { OffersService } from '../../service/offers/offers.service';
@Component({
  selector: 'app-locker-detail',
  standalone: true,
  imports: [
    NgxDropzoneModule,
    NgForOf,
    NgIf,
    MatTabsModule,
    MatIcon,
  ],
  templateUrl: './locker-detail.component.html',
  styleUrl: './locker-detail.component.css'
})
export class LockerDetailComponent  {

  locker: ExchangeLockerDetailsByUser | null = null;
  exchange: any = null;

  constructor(
    private exchangeLockerService: ExchangeLockerService,
    private offersService: OffersService ,
    private route: ActivatedRoute
   ) { 
      const exchangeId = this.route.snapshot.paramMap.get('exchangeId');
      const userId = this.route.snapshot.paramMap.get('userId');
      if (!exchangeId || !userId) {
        return;
      }

      offersService.getOfferByExchangeId(+exchangeId).subscribe((offer:any) => {
        this.exchange = offer;     
        if(this.exchange.userOwn.id == +userId) {
          this.exchange = {
            productOwn: this.exchange.productChange,
            userOwn: this.exchange.userChange,
            productChange: this.exchange.productOwn,
            userChange: this.exchange.userOwn
          }
        }
      })

      exchangeLockerService.getExchangeLockerByExchangeIdAndUserId(+exchangeId, +userId)
      .subscribe( (locker: ExchangeLockerDetailsByUser) => {
          this.locker = locker;
        })
    
   
   }

  selectedTab = 'envio';

  objetctDeposited = false;
  objectRetrieved = false;

  files: any[] = []
  imagesUrl: string[] = []
  maxFiles = 1
  totalFiles = 0


  onSelect(event: any): void {
    if (!event.addedFiles.length) return
    const f: any = event.addedFiles[0]
    f.preview = URL.createObjectURL(f)
    this.files = [f]
    this.totalFiles = 1
  }

  onObjetcDeposit(): void {
    if(this.totalFiles == 1) {
      this.objetctDeposited = true;
    }
  }

  onRemove(): void {
    this.files = []
    this.totalFiles = 0
  }
}
