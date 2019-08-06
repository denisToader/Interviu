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

  firstN: string = "";
  lastN: string = "";
  phoneN: string = "";
  em: string = "";
  editIndex: any = "";

  buttonName: string = ""

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

  add() {
    this.firstN = "";
    this.lastN = "";
    this.phoneN = "";
    this.em = "";
    this.buttonName = "Add";
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

    if(this.buttonName == "Add") {
      let i = this.contactsList.length;
      console.log(i.toString());

      let newContact: {firstName: string, lastName: string, phoneNumber: string, email:string} = {
        firstName: firstN, lastName:lastN, phoneNumber:phoneN, email:em };

      this.contactsList[i] = newContact;
      this.success = true;
      alert("Added!");

    } else {
      this.contactsList[this.editIndex].firstName = firstN;
      this.contactsList[this.editIndex].lastName = lastN;
      this.contactsList[this.editIndex].phoneNumber = phoneN;
      this.contactsList[this.editIndex].email = em;
    }
    this.display="none";  
  }

  edit(i:Number) {
    this.buttonName = "Save";
    this.editIndex = i;
    this.firstN = this.contactsList[this.editIndex].firstName;
    this.lastN = this.contactsList[this.editIndex].lastName;
    this.phoneN = this.contactsList[this.editIndex].phoneNumber;
    this.em = this.contactsList[this.editIndex].email;
    this.display = "block";
    
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
