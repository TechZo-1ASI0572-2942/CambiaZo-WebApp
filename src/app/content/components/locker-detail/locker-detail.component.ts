import { Component } from '@angular/core';
import { NgxDropzoneModule } from 'ngx-dropzone'
import { NgForOf, NgIf } from '@angular/common'
import { MatTabsModule } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon'; 
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
export class LockerDetailComponent {

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
