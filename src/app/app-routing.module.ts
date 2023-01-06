import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AuthGuard } from './guards/auth.guard';
import { PrivateSpaceComponent } from './private-space/private-space.component';
import { AssociationsListComponent } from './associations-list/associations-list.component';
import { RabbitSenderComponent } from './rabbit-sender/rabbit-sender.component';



const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},

  { path: 'login', component: LoginComponent},

  { path: 'users', component: UsersListComponent,
  canActivate: [AuthGuard]},
  
  { path: 'MyPage', component: PrivateSpaceComponent,
  canActivate: [AuthGuard]},

  {path:'rabbit',component:RabbitSenderComponent
  ,canActivate: [AuthGuard]},
  
  {path:'Associations',component:AssociationsListComponent,
  canActivate: [AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

