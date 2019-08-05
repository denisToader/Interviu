import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import {Globals} from '../globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;

  accounts: {email: string, pass: string}[] = [{email: "denis@test.com", pass:"denis"}, {email:"admin@test.com", pass:"admin"}];

  constructor(private formBuilder: FormBuilder, private router: Router, private globals: Globals) { 
    this.messageForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email      
      ])],  
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])]
    })
  }

  onSubmit() {
    this.submitted = true;

    if(this.messageForm.invalid) {
      return;
    }
    
    let email: string = this.messageForm.controls.email.value;
    let pass: string = this.messageForm.controls.password.value

    for(let i=0; i<this.accounts.length; i++) {
      if((this.accounts[i].email == email) && (this.accounts[i].pass == pass)){
        this.success = true;
        this.router.navigate(['/contacts']);
        this.globals.isLoggedIn = true;
      }     
    }

    if(!this.globals.isLoggedIn) {
      alert("Invalid credentials!");
    }
    
  }

  ngOnInit() {
  }

}
