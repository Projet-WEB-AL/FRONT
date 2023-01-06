import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  constructor(
    private api: ApiHelperService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
) {}


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
    
    (document.getElementById('usernameLbl') as HTMLInputElement).textContent =  "Username already exists";
    (document.getElementById('usernameLbl') as HTMLInputElement).style.color =  "red";
  }

  setGreen(){
    (document.getElementById('usernameLbl') as HTMLInputElement).style.color =  "green";
    (document.getElementById('usernameLbl') as HTMLInputElement).textContent =  "Username";
    (document.getElementById('username') as HTMLInputElement).style.color = "green";
    
  }
  
}
