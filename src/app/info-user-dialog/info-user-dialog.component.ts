import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-user-dialog',
  templateUrl: './info-user-dialog.component.html',
  styleUrls: ['./info-user-dialog.component.scss']
})
export class InfoUserDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<InfoUserDialogComponent>,
    @Inject( MAT_DIALOG_DATA) public data:any) {

     }

    
  onNoClick() {

    this.dialogRef.close();
  }
}
