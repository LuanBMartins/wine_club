import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileWineComponent } from './components/user-profile-wine/user-profile-wine.component';
import { UserProfileWineCreateComponent } from './components/user-profile-wine-create/user-profile-wine-create.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'advanced-search' },
  { path: 'register', component: UserCreateComponent },
  { path: 'edit', component: UserEditComponent },
  { path: 'advanced-search', component: AdvancedSearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'profile/wine', component: UserProfileWineComponent },
  { path: 'profile/wine/create', component: UserProfileWineCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }