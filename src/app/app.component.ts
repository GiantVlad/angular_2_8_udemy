import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form', {static: true}) submittedForm: NgForm;
  sEmail: string;
  sPassword: string;
  subscription: {value: number, label: string};
  isSubmitted = false;
  subscriptions = [
    {value: 1, label: 'Basic'},
    {value: 2, label: 'Advanced'},
    {value: 3, label: 'Pro'},
  ];
  onSubmit(): void {
    this.isSubmitted = true;
    console.log(this.submittedForm.value.email);
    this.sEmail = this.submittedForm.value.email;
    this.sPassword = this.submittedForm.value.password;
    this.subscription = this.subscriptions.find(
      el => el.value === +this.submittedForm.value.subscription
    );
    this.submittedForm.reset();
    this.submittedForm.form.patchValue({
      subscription: 2
    });
  }
}
