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

  

  async submitForm() {
    try {
      // Check if passwords match
      if (this.Password !== this.ConfirmPassword) {
        console.error('Passwords do not match');
        // Handle password mismatch (e.g., show an error to the user)
        return;
      }

      // Sign up the user with additional data (name in this case)
      const { data, error } = await this.supabase.auth.signUp({
        email: this.email,
        password: this.Password,
      });

      if (error) {
        console.error('Error signing up:', error);
        // Handle error (e.g., show error to the user)
      } else {
        console.log('User signed up:', data.user);

        // Update the user profile with additional information (name in this case)
        const { data: updatedUser, error: updateError } = await this.supabase
          .from('users')
          .update({ name: this.name })
          .eq('id', data.user?.id);

        if (updateError) {
          console.error('Error updating user profile:', updateError);
          // Handle error updating user profile
        } else {
          console.log('User profile updated:', updatedUser);
          // Handle successful signup and profile update
        }
      }
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle exceptions or errors in the signup process
    }

    alert('Verification is sent to your email');
  }
}