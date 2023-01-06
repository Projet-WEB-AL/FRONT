import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { EditAssocDialogComponent } from '../edit-assoc-dialog/edit-assoc-dialog.component';
import { NewAssocDialogComponent } from '../new-assoc-dialog/new-assoc-dialog.component';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../User.entity';

@Component({
  selector: 'app-associations-list',
  templateUrl: './associations-list.component.html',
  styleUrls: ['./associations-list.component.scss']
})

export class AssociationsListComponent implements OnInit,AfterViewInit{
  
  dataSource :any [] = [] ;
  roles : any [][] = []; 
  displayedColumns: string[] = ['id','username','lastname','firstname'];
  displayedColumnsRole: string[] = ['role'];

  currentUser : User = new User();

  constructor(
  private dialog: MatDialog,
  private http : HttpClient,

  private api: ApiHelperService,
  private tokenStorageService: TokenStorageService,
  private router: Router,){}


  ngAfterViewInit(): void {
    this.getAssociationsByStartingName(" ");

    //get the research bar and bind the function getAssociationsByStartingName to the input event
    /*const inputbar = document.getElementById('inputbar') as HTMLInputElement;
    inputbar.addEventListener('input', 

    (event) => {
      this.getAssociationsByStartingName(inputbar.value);
    }
    );
    console.log(inputbar);*/
  }

  @HostListener('window:input' , ['$event.target'])
  on(targetElement:HTMLInputElement) {
    if(targetElement.id === "inputbar")
     this.getAssociationsByStartingName( targetElement.value);
  }

  ngOnInit(): void {
    this.getAssociationsByStartingName(" ");


    const resquest: Observable<any> = this.http.get('http://localhost:3000/users/private/current', { observe: 'response' });
    lastValueFrom(resquest).then((response: { body: any; }) => {this.currentUser = response.body});
  }


  parseresult(result:any){
    
    return {name: result.name, description : result.description, address : result.address , phone : result.phone,email : result.email,webSite : result.webSite ,users: result.users,roles : result.roles};

  }


  openNewAssosPupup() {
    const dialogRef = this.dialog.open(NewAssocDialogComponent);        
    dialogRef.afterClosed().subscribe(result => {
      
      if(result.created === true && result.name!== undefined && result.name !== " " && result.name !== "" && result.name !== null ){
        
        this.api.post({endpoint: '/associations', data: this.parseresult(result)});
        this.refreshAfter();
      }
    });
  }

  openEditAssosPupup(association : any) {
    
    const dialogRef = this.dialog.open(EditAssocDialogComponent,{data : {association}});        
    dialogRef.afterClosed().subscribe(result => {
      if(result.modified === true && result.name!== undefined && result.name !== " " && result.name !== "" && result.name !== null ){
        this.api.put({endpoint: '/associations/'+association.id, data: this.parseresult(result)});
        this.refreshAfter();
      }
    });
  }


  refreshAfter(){
    window.location.reload();
  }

  getAllAssociations(){
    const resquest: Observable<any> = this.http.get('http://localhost:3000/associations', { observe: 'response' });
    
    lastValueFrom(resquest).then(response => {
      this.dataSource = response.body;


    }
    );
  }

  getAssociationsByStartingName(content: string) {
    if (content == "" || content == null || content == undefined || content == " "){
      this.getAllAssociations();
      return;
    }
    const resquest: Observable<any> = this.http.get('http://localhost:3000/associations/'+content+'/startwith', { observe: 'response' });
    lastValueFrom(resquest).then(response => {this.dataSource = response.body;});
  }



  refresh(){
    const s: string = (document.getElementById('inputbar') as HTMLInputElement).value;
    this.getAssociationsByStartingName(s);
  }


  createAssociation(){     
    this.openNewAssosPupup();    
  }

  update(association: any){

    this.openEditAssosPupup(association);
    
  }

  delete(association: any){
    this.api.delete({endpoint: '/associations/'+association.id});
    this.refreshAfter();
  }

  goToAssociation(association: any){
    //this.router.navigate(['/association/'+association.id]);
  }


  join(association:any ){
    
    association.users.push(this.currentUser);

    let newTab = [];
    for(let i = 0; i < association.users.length; i++){
        newTab.push({id : association.users[i].username})

    }

    association.users = newTab;

    this.api.put({endpoint: '/associations/'+association.id, data: association});

    this.refreshAfter();
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
    this.refreshAfter();
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
