import { Component } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';

  password:string='';

  errorMessage: string = '';

  supabase = createClient('https://wyxysfsyaljozlbffyib.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5eHlzZnN5YWxqb3psYmZmeWliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc3NzY2ODIsImV4cCI6MjAxMzM1MjY4Mn0.dN1vQjjA9lFeF1aYKGHHDkDwa0Ux_GXd9PwWEHep0-8')

  constructor(private router: Router,private toastr: ToastrService) {}
  async login() {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password,
      });

      if (error) {
        this.errorMessage = 'Invalid email or password';
        this.toastr.error('Invalid Email or Password');
      } else {
        this.toastr.success('Login Successful');
        localStorage.setItem('token', '12345');
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      console.error('Login error:', error);
      this.errorMessage = 'An error occurred during login';
    }
  }
}


