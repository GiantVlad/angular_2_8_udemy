import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  singupForm: FormGroup;
  invalidUserNames = ['admin', 'administrator'];
  invalidEmails = ['admin@myaccont.com', 'info@myaccont.com', 'no-replay@myaccont.com'];
  invalidSingupForm = true;
  ngOnInit(): void {
    this.singupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, this.validateNames.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.asyncValidateEmail.bind(this)),
      }),
      gender: new FormControl('female'),
      hobbies: new FormArray([])
    });
    this.singupForm.valueChanges.subscribe((val) => {
      console.log(val);
    });
    this.singupForm.statusChanges.subscribe((status) => {
      this.invalidSingupForm = status !== 'VALID';
    });
  }
  onSubmit() {
    console.log(this.singupForm);
    this.singupForm.reset({gender: 'female'});
  }
  isFieldInvalid(fieldName: string): boolean {
    return this.singupForm.get(fieldName).invalid && this.singupForm.get(fieldName).touched;
  }
  onAddHobby() {
    const hobby = new FormControl(null, Validators.required);
    (this.singupForm.get('hobbies') as FormArray).push(hobby);
  }
  getControls() {
    return (this.singupForm.get('hobbies') as FormArray).controls;
  }
  validateNames(control: FormControl): {[s: string]: boolean} {
    if (control.value && this.invalidUserNames.indexOf(control.value.toLowerCase()) !== -1) {
      return {invalidName: true};
    }
    return null;
  }

  asyncValidateEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value && this.invalidEmails.indexOf(control.value.toLowerCase()) !== -1) {
          resolve({invalidEmail: true});
        }
        resolve(null);
      }, 1500);
    });
    return promise;
  }
}
