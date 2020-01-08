import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SideNavigationComponent } from './shared/layout/side-navigation/side-navigation.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { FilterPipe } from './shared/services/filter.pipe';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    SideNavigationComponent,
    MessagesComponent,
    MyAccountComponent,
    FilterPipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
