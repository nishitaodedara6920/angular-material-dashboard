import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray   } from '@angular/forms';


interface Animal {
  name: string;
}
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitted: boolean = false;
  role : any = 
  {
    student: false,
    employee: false,
    intern: false,
    any: false
  };
  Data: Array<any> = [
    { name: 'Student', value: 'Student' },
    { name: 'Employee', value: 'Employee' },
    { name: 'Intern', value: 'Intern' },
    { name: 'Other', value: 'Other' },
  ];
  animals: Animal[] = [
    {name: 'Dog'},
    {name: 'Cat'},
    {name: 'Cow'},
    {name: 'Fox'},
  ];
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.registerForm = this.formbuilder.group ({
    firstName: [null, Validators.required],
    lastName:  [null, Validators.required],
    address:  [null, Validators.required],
    address2:  [null, Validators.required],
    city:  [null, Validators.required],
    state:  [null, Validators.required],
    pincode:   [null, Validators.required],
    role: [null, Validators.required],
    checkArray: this.formbuilder.array([], [Validators.required]),
    });
   
    
  }
  
  get f() { return this.registerForm.controls;
  }

    // checkbox select method
    checkboxSelect(event: any, name: any){
      if(name == 'student'){
        this.role['student'] = event.target.checked;
      }
      if(name == 'employee'){
        this.role['employee'] = event.target.checked;
      }
      if(name == 'intern'){
        this.role['intern'] = event.target.checked;
      }
      if(name == 'any'){
        this.role['any'] = event.target.checked;
      }
    } 
    onCheckboxChange(e: any) {
      const checkArray: FormArray = this.registerForm.get('checkArray') as FormArray;
      if (e.target.checked) {
        checkArray.push(new FormControl(e.target.value));
      } else {
        let i: number = 0;
        checkArray.controls.forEach((item: any) => {
          if (item.value == e.target.value) {
            checkArray.removeAt(i);
            return;
          }
          i++;
        });
      }
    }
  onSubmit() {
    this.isSubmitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    // display form values on success
    console.log(this.registerForm.value);
}

onReset() {
  this.isSubmitted = false;
  this.registerForm.reset();
} 
}



