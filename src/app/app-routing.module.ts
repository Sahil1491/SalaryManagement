import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './Navbar/navbar/navbar.component';
import { SignUpComponent } from './SignUp/sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';




const routes: Routes = [{path:'',redirectTo:'Navbar',pathMatch:'full'},{path:'Navbar',component:NavbarComponent},
{path:'Signup',component:SignUpComponent},
{path:'login',component:LoginComponent},
{path:'dashboard',component:DashboardComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
