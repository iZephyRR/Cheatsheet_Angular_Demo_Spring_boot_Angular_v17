import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheatsheetCreateComponent } from './cheatsheet-create/cheatsheet-create.component';
import { CheatsheetListComponent } from './cheatsheet-list/cheatsheet-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './services/auth/auth.guard';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateCheatsheetComponent } from './update-cheatsheet/update-cheatsheet.component';
import { CheatsheetsByCategoryComponent } from './cheatsheets-by-category/cheatsheets-by-category.component';
import { SendDocumentComponent } from './send-document/send-document.component';

const routes: Routes = [
  { path : '', component : HomeComponent },
  { path : 'home', component : HomeComponent},
  { path : 'cheatsheet/create', component : CheatsheetCreateComponent, canActivate: [authGuard]},
  { path : 'cheatsheets', component : CheatsheetListComponent},
  { path : 'login' , component : LoginComponent},
  { path : 'signup', component : SignupComponent},
  { path : 'category/create', component: CategoryCreateComponent},
  { path : 'profile', component : ProfileComponent},
  { path : 'update/cheatsheet/:id' , component : UpdateCheatsheetComponent},
  { path : 'category/:id/:name' , component : CheatsheetsByCategoryComponent},
  { path : 'send-document' , component : SendDocumentComponent}
]; 
//
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
