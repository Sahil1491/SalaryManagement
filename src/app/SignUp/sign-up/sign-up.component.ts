import { Component } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],

})
export class SignUpComponent {

  supabase = createClient('https://wyxysfsyaljozlbffyib.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5eHlzZnN5YWxqb3psYmZmeWliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc3NzY2ODIsImV4cCI6MjAxMzM1MjY4Mn0.dN1vQjjA9lFeF1aYKGHHDkDwa0Ux_GXd9PwWEHep0-8')
signUpForm:FormGroup;
 
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService) { 
      this.signUpForm =this.fb.group({
        name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{2,35}')]],
        email: ['', [Validators.required, Validators.email]],
        password: new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(
              '^(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*])[A-Za-z\\d@$!%*?&]{6,}$'
            ),
          ],
        ),
        ConfirmPassword: new FormControl('', [Validators.required]),
      });
  }
  

  async submitForm() {
    if(this.signUpForm.valid){
      try{
        const emailchecker=await this.supabase.from('Sign').select('*').eq('email',this.signUpForm.value.email).single();
        if(emailchecker.data){
          this.toastr.error('email already exist')
        }
        else{
            const {data,error}=await this.supabase.auth.signUp({
              email:this.signUpForm.value.email,
              password:this.signUpForm.value.password
            });
            if(error){
              alert(error.message);
            }
            else if(data){
              alert('sign up successfull');
              const {name, email, password}= this.signUpForm.value;
              this.signUpToSupabase(name,email,password);
              this.toastr.success('Sign up successfull');
              this.router.navigate(['/login']);
            }
        } 
      }
      catch{
        console.log('error')
      }
    }
  }
  async signUpToSupabase(name:string,email:string,password:string){
    try{
      const {data,error}=await this.supabase.from('Sign').insert([{name,email,password}]).select();


      if(error){
        console.error('error inserting data into signtable');
        
      }

    }
    catch(error){
      console.error("Error signing up to supabase");
      
    }
  }
   
  
}