import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  display='none';
  editForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;

  contactsList: {firstName: string, lastName: string, phoneNumber: string, email:string}[] = [
    {
      firstName: "Popescu",
      lastName: "Andrei",
      phoneNumber: "0785963123",
      email: "popescu.andrei@gmail.com"
    },
    {
      firstName: "Anghel",
      lastName: "Mircea",
      phoneNumber: "07145236789",
      email: "anghel.mircea@gmail.com"
    }
  ];

  delete(index: Number) {
    let del = confirm("Are you sure you want to delete the contact?");
    if(del) {
      for(let i=0; i<this.contactsList.length; i++) {
        if(index == i) {
          this.contactsList.splice(i,1);
          //alert("Contact deleted!");
        }
      }
    }
  }

  add(index: Number) {
    this.display="block"; 
  }

  onCloseHandled() {
    this.display="none";
  }

  submitChanges(){
    this.submitted = true;

    let firstN: string = this.editForm.controls.firstName.value;
    let lastN: string = this.editForm.controls.lastName.value;
    let phoneN: string = this.editForm.controls.phoneNumber.value;
    let em: string = this.editForm.controls.email.value;

    if(this.editForm.invalid) {
      return;
    }

    let i = this.contactsList.length;
    console.log(i.toString());

    let newContact: {firstName: string, lastName: string, phoneNumber: string, email:string} = {
      firstName: firstN, lastName:lastN, phoneNumber:phoneN, email:em };

    this.contactsList[i] = newContact;
    this.success = true;
    alert("Added!");
    this.display="none";  
  }
  
  constructor(private formBuilder: FormBuilder) { 
    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)     
      ])],  
      lastName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      phoneNumber: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10)
        //Validators.pattern("^[0-9]")
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])]
    })
  }

  ngOnInit() {
  }

}
