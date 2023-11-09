import { Component } from '@angular/core';
import { createClient } from '@supabase/supabase-js';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  name: string = '';
  email: string = '';
  Password: string = '';
  ConfirmPassword:string='';
  supabase = createClient('https://wyxysfsyaljozlbffyib.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5eHlzZnN5YWxqb3psYmZmeWliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc3NzY2ODIsImV4cCI6MjAxMzM1MjY4Mn0.dN1vQjjA9lFeF1aYKGHHDkDwa0Ux_GXd9PwWEHep0-8')

  

 async submitForm(){
 try {
  const { data, error } = await this.supabase.auth.signUp({
    email: this.email,
    password: this.Password
  });

  if (error) {
    console.error('Error signing up:', error);
    // Handle error (e.g., show error to the user)
  } else {
    console.log('User signed up:', data);
    // Handle successful signup
  }
} catch (error) {
  console.error('Error signing up:', error);
  // Handle exceptions or errors in the signup process
}
alert("verification is sent on your email")
}
}