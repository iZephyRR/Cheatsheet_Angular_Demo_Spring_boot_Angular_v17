import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainContantComponent } from './main-contant/main-contant.component';
import { CheatsheetCreateComponent } from './cheatsheet-create/cheatsheet-create.component';
import { CheatsheetListComponent } from './cheatsheet-list/cheatsheet-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth/auth.service';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateCheatsheetComponent } from './update-cheatsheet/update-cheatsheet.component';
import { CheatsheetsByCategoryComponent } from './cheatsheets-by-category/cheatsheets-by-category.component';
import { MessageComponent } from './message/message.component';
import { NotificationComponent } from './notification/notification.component';
import { SendDocumentComponent } from './send-document/send-document.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainContantComponent,
    CheatsheetCreateComponent,
    CheatsheetListComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    CategoryCreateComponent,
    ProfileComponent,
    UpdateCheatsheetComponent,
    CheatsheetsByCategoryComponent,
    MessageComponent,
    NotificationComponent,
    SendDocumentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    CommonModule,
    FormsModule,
    NgFor
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(),
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
