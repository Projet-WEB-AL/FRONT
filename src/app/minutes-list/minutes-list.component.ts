import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-minutes-list',
  templateUrl: './minutes-list.component.html',
  styleUrls: ['./minutes-list.component.scss']
})
export class MinutesListComponent {
  dataSource :any [] = [] ;
  roles : any [][] = []; 
  displayedColumns: string[] = ['id','username','lastname','firstname'];
  displayedColumnsRole: string[] = ['role'];

  constructor(

  private http : HttpClient,

  private api: ApiHelperService,
  private tokenStorageService: TokenStorageService,
  private router: Router,


  @Inject('id')
  private id : number,
  
  ){}

  ngOnInit(): void {
    this.getAllMinutes();
    //get the research bar and bind the function getAssociationsByStartingName to the input event
    const inputbar = document.getElementById('inputbar') as HTMLInputElement;
    
    inputbar.addEventListener('input', (event) => {
    this.getMinutesByStartingName(inputbar.value);
    }
    );
  }





  getAllMinutes(){
    const resquest: Observable<any> = this.http.get(environment.API_URL+'/associations/'+this.id, { observe: 'response' });
    
    lastValueFrom(resquest).then(response => {
      this.dataSource = response.body.minutes;

    }
    );
  }


  getMinutesByStartingName(name:string){
  
  }



}
