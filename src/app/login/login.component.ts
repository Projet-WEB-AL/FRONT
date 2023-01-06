import { Component } from '@angular/core';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  constructor(
        private api: ApiHelperService,
        private tokenStorageService: TokenStorageService,
        private router: Router,            
  ) {}

  ngOnInit(): void {


    


  }

  userid :number = 1;


  login(): void {
    //bug if you enter a user that doesn't exist
    const username: string = (document.getElementById('usernameLogin') as HTMLInputElement).value;
    const password: string = (document.getElementById('passwordLogin') as HTMLInputElement).value;
    if (username !== "" && password !== "") {
    this.setGreen();
    
    this.api.post({endpoint: '/auth/login', data: { username:username , password } } ).then(
      
      response => {

        this.tokenStorageService.save(response.access_token)
        
        if(this.tokenStorageService.isLogged()){

            this.router.navigateByUrl('/MyPage');
        }

      }).catch( () =>
      {
        console.log("error not loged")
        this.setRed(); 
      }        
      );
    }
  }

  setRed(){
    (document.getElementById('passwordLogin') as HTMLInputElement).style.borderColor = "red";
    
  }

  setGreen(){
    (document.getElementById('passwordLogin') as HTMLInputElement).style.borderColor = "green";
    
  }

  
}
