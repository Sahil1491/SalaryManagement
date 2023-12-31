import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './SignUp/sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './Auth/auth.guard';


const routes: Routes = [{path:'',redirectTo:'Signup',pathMatch:'full'},{path:'Signup',component:SignUpComponent},
{path:'Signup',component:SignUpComponent},
{path:'login',component:LoginComponent},
{path:'dashboard',component:DashboardComponent,canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
