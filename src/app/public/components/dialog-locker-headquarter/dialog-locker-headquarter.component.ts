import { Component, Inject,inject, OnInit } from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog'
import { DialogSelectProductComponent } from '../dialog-select-product/dialog-select-product.component'
import { MatIcon } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {CambiazoStateService} from "../../../content/states/cambiazo-state.service";
import { Headquarters } from '../../../content/model/headquarters/headquerters';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-dialog-locker-headquarter',
  standalone: true,
  imports: [MatIcon,NgIf,NgFor,MatButton, MatCardModule],
  templateUrl: './dialog-locker-headquarter.component.html',
  styleUrl: './dialog-locker-headquarter.component.css'
})
export class DialogLockerHeadquarterComponent {

  user: any;
  loading = true;
  showOffer = false;

   markers: { top: number, left: number, label: string }[] = [];
  selectedLocation: Headquarters | null = null;
  hoveredMarker: any = null;

   private cambiazoState: CambiazoStateService = inject(CambiazoStateService);
   headquarters : Headquarters[] = []
 
  
  constructor(  
      public dialogRef: MatDialogRef<DialogLockerHeadquarterComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialog: MatDialog
    ) {
    this.headquarters = this.cambiazoState.headquarters();
    }

  
  selectLocation(headquarter: Headquarters): void {
    this.selectedLocation = headquarter;
    console.log('Selected location:', this.selectedLocation);
  }

  onDialogCancel(): void {
      this.dialogRef.close(); 
  }

  onDialogSelectProduct(): void {
    if (!this.selectedLocation) {
      //manejar el caso en que no se haya seleccionado una ubicación
      return;
    }

    this.dialog.open(DialogSelectProductComponent, {
      data: {data: this.data, headquearter: this.selectedLocation},
      width: '100rem'
    });        
  }

    cancel(): void {
      this.dialogRef.close()
    }

 
  closeDialog(): void {
    }
}
