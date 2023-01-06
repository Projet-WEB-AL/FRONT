import { Component, Inject } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { User } from '../User.entity';
import { lastValueFrom, Observable } from 'rxjs';


export interface Member {
  id: string;
}
@Component({
  selector: 'app-edit-assoc-dialog',
  templateUrl: './edit-assoc-dialog.component.html',
  styleUrls: ['./edit-assoc-dialog.component.scss']
})
export class EditAssocDialogComponent {
  addOnBlur = true;
  
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  http: any;

  constructor(
      public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      
      ) {
   }

  assosName: any;

  address: any;

  phone: any;

  email: any;

  webSite: any;

  description: any;

  assosMembers: Member[] = [];

  assosRoles: any[] = [];
  
      ngOnInit(): void {
        
        this.assosName = this.data.association.name;
        this.address = this.data.association.address;
        this.phone = this.data.association.phone;
        this.email = this.data.association.email;
        this.webSite = this.data.association.webSite;
        this.description = this.data.association.description;
        
        
        (document.getElementById('Name') as HTMLInputElement).value = this.assosName;
        (document.getElementById('address') as HTMLInputElement).value = this.address;
        (document.getElementById('phone') as HTMLInputElement).value = this.phone;
        (document.getElementById('email') as HTMLInputElement).value = this.email;
        (document.getElementById('webSite') as HTMLInputElement).value = this.webSite;
        (document.getElementById('description') as HTMLInputElement).value = this.description;

        

        for( let i = 0 ; i < this.data.association.users.length ; i++){
          let val = this.data.association.users[i]['username'];
          this.assosMembers.push({id : val});
        }







      }
  

    onAddUserClick(){

      this.assosMembers.push({ id : (document.getElementById('newUser') as HTMLInputElement).value} );
      (document.getElementById('newUser') as HTMLInputElement).value = "";
    }

    onfinishClick() {

      this.assosName = (document.getElementById('Name') as HTMLInputElement).value;

      this.description = (document.getElementById('description') as HTMLInputElement).value;

      this.address = (document.getElementById('address') as HTMLInputElement).value;

      this.phone = (document.getElementById('phone') as HTMLInputElement).value;

      this.email = (document.getElementById('email') as HTMLInputElement).value;

      this.webSite = (document.getElementById('webSite') as HTMLInputElement).value;
  

      this.dialogRef.close({modified : true, name: this.assosName, description : this.description, address : this.address , phone : this.phone,email : this.email,webSite : this.webSite ,users: this.assosMembers,roles:this.assosRoles});
  
    }

    onCancelClick() {
      this.dialogRef.close({modified : false});
    }


    remove(member: Member): void {
      const index = this.assosMembers.indexOf(member);
  
      if (index >= 0) {
        this.assosMembers.splice(index, 1);
        this.assosRoles.splice(index, 1);
      }
    }
  

    edit(member: Member, event: MatChipEditedEvent) {
      const value = event.value.trim();
  
      if (!value) {
        this.remove(member);
        return;
      }

    const index = this.assosMembers.indexOf(member);
    if (index > 0) {
      this.assosMembers[index].id = value;
      
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value && !this.assosMembers.find((member) => member.id === value)) {

      this.assosMembers.push({id: value});
      this.assosRoles.push(2);

    }

    // Clear the input value
    event.chipInput!.clear();
  }

}
