import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../User.entity';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})


export class NavComponent {

  currentUser: User = new User() ;
  
  constructor(
    private service: TokenStorageService,
    private route: Router,
    private http : HttpClient,
    //private userDeleteComponent : UserDeleteComponent
    private api: ApiHelperService,

    private router: Router,

  ) {}

  ngOnInit(): void {
    const resquest: Observable<any> = this.http.get(environment.API_URL+'/users/private/current', { observe: 'response' });
    lastValueFrom(resquest).then((response: { body: any; }) => {this.currentUser = response.body});
  }


  logout(): void {
    this.service.clear();
    this.route.navigateByUrl("/login");
  }

  myPage(): void {
    this.route.navigateByUrl("/MyPage");
  }

  userList(): void {
    this.route.navigateByUrl("/users");

  }

  assosList(): void {
    this.route.navigateByUrl("/Associations");

  }


  rabbit() : void{
    this.route.navigateByUrl("/rabbit");
  }


}
