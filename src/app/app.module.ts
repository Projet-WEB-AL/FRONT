import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenHttpInterceptor } from './interceptors/token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { UserFormComponent } from './user-form/user-form.component'; 
import { MatIconModule } from '@angular/material/icon';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { PrivateSpaceComponent } from './private-space/private-space.component';
import { UpdateUserDialogComponent } from './update-user-dialog/update-user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InfoUserDialogComponent } from './info-user-dialog/info-user-dialog.component';
import { AssociationsListComponent } from './associations-list/associations-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { NewAssocDialogComponent } from './new-assoc-dialog/new-assoc-dialog.component';
import {MatExpansionModule, MatExpansionPanel, MAT_EXPANSION_PANEL_DEFAULT_OPTIONS} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ResearchBarComponent } from './research-bar/research-bar.component';
import { EditAssocDialogComponent } from './edit-assoc-dialog/edit-assoc-dialog.component';
import { MinutesListComponent } from './minutes-list/minutes-list.component';
import { RabbitSenderComponent } from './rabbit-sender/rabbit-sender.component';

@NgModule({
  declarations: [
    
    AppComponent,
    UsersListComponent,
    LoginComponent,
    NavComponent,
    UserFormComponent,
    UserDeleteComponent,
    PrivateSpaceComponent,
    UpdateUserDialogComponent,
    InfoUserDialogComponent,
    AssociationsListComponent,

    NewAssocDialogComponent,
    ResearchBarComponent,
    EditAssocDialogComponent,
    MinutesListComponent,
    RabbitSenderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatChipsModule,
    MatFormFieldModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHttpInterceptor,
      multi: true,
    },
    {
      provide: MAT_EXPANSION_PANEL_DEFAULT_OPTIONS,
      useValue: {
        expansionDuration: 5000
      }
    },
    
      


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
