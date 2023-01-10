import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { LoginComponent } from '../login/login.component';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';
import { User } from '../User.entity';

@Component({
  selector: 'app-private-space',
  templateUrl: './private-space.component.html',
  styleUrls: ['./private-space.component.scss']
})
export class PrivateSpaceComponent {

  currentUser :User = new User();

  assosJoined : any [] = [];

  displayedColumns: string[] = ['name',' '];

constructor(
  private http : HttpClient,
  //private userDeleteComponent : UserDeleteComponent
  private api: ApiHelperService,
  private tokenStorageService: TokenStorageService,
  private router: Router,
  private dialog: MatDialog,
  
) { }


  ngOnInit(): void {
    
    const resquest: Observable<any> = this.http.get('http://localhost/api/users/private/current', { observe: 'response' });
    lastValueFrom(resquest).then(response => {
      
      this.currentUser = response.body;
    
      const resquest2: Observable<any> = this.http.get('http://localhost/api/associations/'+this.currentUser.username+'/isMember', { observe: 'response' });
      lastValueFrom(resquest2).then(response => {this.assosJoined = response.body});
    
    
    });





    
  }



  openUpdatePupup() {
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, {data: {firstname: this.currentUser.firstname, lastname:this.currentUser.lastname,username:this.currentUser.username,age : this.currentUser.age}});        
    dialogRef.afterClosed().subscribe(result => {
      //this.api.put({endpoint: '/users/'+this.currentUser.id ,data: {firstname: result.firstname, lastname:result.lastname ,age : result.age,username:result.username,password: this.currentUser.password}});
      this.http.put('http://localhost/api/users/'+this.currentUser.id, {firstname: result.firstname, lastname:result.lastname ,age : result.age,username:result.username,password: this.currentUser.password}).subscribe((response) => {window.location.reload()}
      );
    });
  }


  join(association:any ){
    
    association.users.push(this.currentUser);

    let newTab = [];
    for(let i = 0; i < association.users.length; i++){
        newTab.push({id : association.users[i].username})

    }

    association.users = newTab;

    this.api.put({endpoint: '/associations/'+association.id, data: association});

    window.location.reload();
  }


  leave(association:any ){

    //remove the current user from the association


    let newTab = [];
    for(let i = 0; i < association.users.length; i++){
      if(association.users[i].username !== this.currentUser.username){

        newTab.push({id : association.users[i].username})
      }
    }
    association.users = newTab;
    this.api.put({endpoint: '/associations/'+association.id, data: association});
    window.location.reload();
  }

  isJoined(association:any) : boolean{

    for(let i = 0; i < association.users.length; i++){
      if(association.users[i].username === this.currentUser.username){
        return true;
      }
    }
    return false;
  }


}
