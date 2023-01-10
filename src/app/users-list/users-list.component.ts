import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';
import { InfoUserDialogComponent } from '../info-user-dialog/info-user-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit {

  dataSource :any [] = [] ;

constructor(



  private dialog: MatDialog,
  private http : HttpClient,
  private api: ApiHelperService,
  private tokenStorageService: TokenStorageService,
  private router: Router,
) { }

  displayedColumns: string[] = ['id', 'lastname', 'firstname','username', 'age',"update","info",'delete'];



  @HostListener('window:input' , ['$event.target'])
  on(targetElement:HTMLInputElement) {
    if(targetElement.id === "inputbar")
     this.getUsersByStartingName( targetElement.value);
  }



  openUpdatePupup(user:any) {
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, {panelClass: 'my-dialog-background',data: {firstname: user.firstname, lastname:user.lastname,username:user.username,age : user.age}});        
    dialogRef.afterClosed().subscribe(result => {

      this.api.put({endpoint: '/users/'+user.id, data: {firstname: result.firstname, lastname:result.lastname ,age : result.age,username:result.username,password: user.password}});
      window.location.reload();
    });
  }

  openInfoPupup(user:any) {
    const dialogRef = this.dialog.open(InfoUserDialogComponent, {data: {firstname: user.firstname, lastname:user.lastname ,age : user.age,username:user.username,password: user.password}});        
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  ngAfterViewInit(): void {
    this.getAllusers();

  }

  ngOnInit(): void {
    
    this.getAllusers();
    
  }

  getAllusers(){
    const resquest: Observable<any> = this.http.get('http://localhost/api/users', { observe: 'response' });
    lastValueFrom(resquest).then(response => this.dataSource = response.body); 


  }


  delete(user : any){
    //this.userDeleteComponent.delete(user);
    this.api.delete({endpoint: '/users/'+user.id}).then(response => window.location.reload() );
      
  }


  update(user : any){
    this.openUpdatePupup(user);
  }


  info(user:any){
    this.openInfoPupup(user);
  }


  async register(){

    const firstname: string = (document.getElementById('firstname') as HTMLInputElement).value;
    const lastname: string = (document.getElementById('lastname') as HTMLInputElement).value;
    const age: string = (document.getElementById('age') as HTMLInputElement).value;
    const username: string = (document.getElementById('username') as HTMLInputElement).value;  
    const password: string = (document.getElementById('passwordRegister') as HTMLInputElement).value;  


    if (firstname !== "" && lastname !== "" && age !== "" && password!== "" && username !== "") {
      
      this.api.get({endpoint: '/users/'+username+'/existUsername'}).then(
        response => {
          if(response){
            this.api.post({endpoint: '/users', data: {firstname,lastname,age,username,password}});
            window.location.reload();
          }

          else{
            this.setRed();
          }
          
        }
      );
    }
  }

  setRed(){
    (document.getElementById('username') as HTMLInputElement).style.color = "red";
    
  }

  setGreen(){

    (document.getElementById('username') as HTMLInputElement).style.color = "green";
    
  }

  getUsersByStartingName(content: string){
    if (content == "" || content == null || content == undefined || content == " "){
      this.getAllusers();
      return;
    }
    content = content.toString();
    const resquest: Observable<any> = this.http.get('http://localhost/api/users/'+content+'/startwith', { observe: 'response' });
    lastValueFrom(resquest).then(response => {
      this.dataSource = response.body
      console.log(response.body);
    }
      );
  }

  refresh(){
    const s: string = (document.getElementById('inputbar') as HTMLInputElement).value;
    
    this.getUsersByStartingName(s);

  }
}