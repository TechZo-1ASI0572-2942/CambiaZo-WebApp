import { Component, Inject, OnInit } from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog'
import { DialogSelectProductComponent } from '../dialog-select-product/dialog-select-product.component'
import { MatIcon } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-dialog-locker-headquarter',
  standalone: true,
  imports: [MatIcon,NgIf,NgFor,MatButton],
  templateUrl: './dialog-locker-headquarter.component.html',
  styleUrl: './dialog-locker-headquarter.component.css'
})
export class DialogLockerHeadquarterComponent implements OnInit {

  user: any;
  loading = true;
  showOffer = false;

  sedes = [
    'Sede Surco - Av. Caminos del Inca 1234',
    'Sede San Isidro - Av. Javier Prado Este 456',
    'Sede Miraflores - Av. Larco 789',
    'Sede La Molina - Av. La Molina 1010',
    'Sede San Miguel - Av. La Marina 1500',
  ]


   markers: { top: number, left: number, label: string }[] = [];
  selectedLocation: any = null;
  hoveredMarker: any = null;

 
  
  constructor(  
      public dialogRef: MatDialogRef<DialogLockerHeadquarterComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialog: MatDialog
    ) {}

    ngOnInit(): void {
     this.generateRandomMarkers(5); 
    }

     generateRandomMarkers(count: number): void {
    this.markers = Array.from({ length: count }).map((_, i) => ({
      top: Math.random() * 80 + 5,  
      left: Math.random() * 80 + 5,  
      label: this.sedes[i]
    }));
  }

  selectLocation(marker: any): void {
    this.selectedLocation = marker;
  }

  onDialogCancel(): void {
      this.dialogRef.close(); 
  }

    onDialogSelectProduct(): void {
      this.cancel();
      this.dialog.open(DialogSelectProductComponent, {
        data: this.data,
        width: '100rem'
      });        
    }

    cancel(): void {
      this.dialogRef.close()
    }

 
  closeDialog(): void {
    }
}
