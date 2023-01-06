import { Component, inject, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.scss']
})
export class UpdateUserDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    @Inject( MAT_DIALOG_DATA) public data:any    
    ) {

 }

    ngOnInit(): void {
      (document.getElementById('firstnameP') as HTMLInputElement).value  = this.data.firstname;
      (document.getElementById('lastnameP') as HTMLInputElement).value  = this.data.lastname;
      (document.getElementById('ageP') as HTMLInputElement).value  = this.data.age;
      (document.getElementById('usernameP') as HTMLInputElement).value  = this.data.username;
    }

  onUpdateClick() {

    this.data.firstname = (document.getElementById('firstnameP') as HTMLInputElement).value;
    this.data.lastname = (document.getElementById('lastnameP') as HTMLInputElement).value;
    this.data.age = (document.getElementById('ageP') as HTMLInputElement).value;
    this.data.username = (document.getElementById('usernameP') as HTMLInputElement).value;

    this.dialogRef.close(this.data);

  }
}
