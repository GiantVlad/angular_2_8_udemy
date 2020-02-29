import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
// import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f', {static: true}) signUpForm: NgForm;
  defQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secret: '',
    answer: '',
    gender: '',
 };
  isSubmitted = false;
 suggestUserName() {
    const suggestedName = 'Superuser';
    /*this.signUpForm.setValue({
      userData: {
        username: suggestedName,
        email: ''
      },
      secret: 'pet',
      questionAnswer: '',
      gender: 'male'
    });*/
    this.signUpForm.form.patchValue({
      userData: {
        username: suggestedName,
      }
    });
  }
  // onSubmit(form: NgForm) {
  //   //   console.log(form);
  //   // }
    onSubmit() {
      this.user.username = this.signUpForm.value.userData.username;
      this.user.email = this.signUpForm.value.userData.email;
      this.user.secret = this.signUpForm.value.secret;
      this.user.answer = this.signUpForm.value.questionAnswer;
      this.user.gender = this.signUpForm.value.gender;
      this.isSubmitted = true;
      this.signUpForm.reset();
    }
}
