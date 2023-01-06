import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiHelperService } from '../services/api-helper.service';

@Component({
  selector: 'app-rabbit-sender',
  templateUrl: './rabbit-sender.component.html',
  styleUrls: ['./rabbit-sender.component.scss']
})
export class RabbitSenderComponent {

constructor(private http: HttpClient,

  private api: ApiHelperService,
  

  ) { }

  send(){

    let mess = (document.getElementById('message') as HTMLInputElement).value;

    this.api.post({endpoint: '/rabbitmq', data: {message:mess}});
    
    window.location.reload();

  }

}
