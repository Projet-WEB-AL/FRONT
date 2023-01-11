import { Component, Inject } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { lastValueFrom, Observable } from 'rxjs';
import { User } from '../User.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


export interface Member {
  id: Number;
}



@Component({
  selector: 'app-new-assoc-dialog',
  templateUrl: './new-assoc-dialog.component.html',
  styleUrls: ['./new-assoc-dialog.component.scss']
})
export class NewAssocDialogComponent {
  addOnBlur = true;
  currentUser = new User();
  
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
      public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
      private http : HttpClient
      ) {
  }

  assosName: any;

  assosMembers: any[] = [];
  assosRoles: any[] = [];

  address: any;

  phone: any;

  email: any;

  webSite: any;

  description: any;


  
      ngOnInit(): void {
        const resquest: Observable<any> = this.http.get(environment.API_URL+'/users/private/current', { observe: 'response' });
        lastValueFrom(resquest).then((response: { body: any; }) => {
          
          this.currentUser = response.body;
          
      });

      }
  

    onAddUserClick(){
      this.assosMembers.push((document.getElementById('newUser') as HTMLInputElement).value);
      (document.getElementById('newUser') as HTMLInputElement).value = "";
    }

    onfinishClick() {

      this.assosName = (document.getElementById('Name') as HTMLInputElement).value;
      
      this.description = (document.getElementById('description') as HTMLInputElement).value;

      this.address = (document.getElementById('address') as HTMLInputElement).value;

      this.phone = (document.getElementById('phone') as HTMLInputElement).value;

      this.email = (document.getElementById('email') as HTMLInputElement).value;

      this.webSite = (document.getElementById('webSite') as HTMLInputElement).value;
  
      if (this.assosName == "") {
        alert("Please enter a name");
        return;
      }



    this.assosMembers.push({id:this.currentUser.username});
    

    for (let i = 1; i<this.assosMembers.length; i++){
      this.assosRoles.push(2);
    }

    this.assosRoles.push(1);
    
    this.dialogRef.close({created : true,name: this.assosName, description : this.description, address : this.address , phone : this.phone,email : this.email,webSite : this.webSite ,users: this.assosMembers,roles: this.assosRoles});
    


    }

    onCancelClick() {
      this.dialogRef.close({created : false});
    }


    remove(member: Member): void {
      const index = this.assosMembers.indexOf(member);
  
      if (index >= 0) {
        this.assosMembers.splice(index, 1);
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

    }

    // Clear the input value
    event.chipInput!.clear();
  }

    

  }
  
