import { Component } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}
   async login() {
    debugger;
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: this.email,
      password: this.password,
    })
    if (error) {
      this.errorMessage = 'Invalid email or password';
    } else {
      // Navigate to the dashboard upon successful login
      this.router.navigate(['/dashboard']);
    }
  } catch (error: any) {
    console.error('Login error:', error);
    this.errorMessage = 'An error occurred during login';
  }
}

