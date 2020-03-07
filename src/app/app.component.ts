import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectStatuses = ['Stable', 'Critical', 'Finished'];
  projectForm: FormGroup;
  invalidForm = true;

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      name: new FormControl(null, Validators.required, this.customAsyncNameValidate.bind(this)),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl(null),
    });
    this.projectForm.statusChanges.subscribe((status: string) => {
      this.invalidForm = status !== 'VALID';
    });
  }
  isFieldInvalid(fieldName: string): boolean {
    return this.projectForm.get(fieldName).invalid && this.projectForm.get(fieldName).touched;
  }
  onSubmit(): void {
    console.log(this.projectForm);
    this.projectForm.reset({projectStatus: this.projectStatuses[0]});
  }
  customAsyncNameValidate(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value && control.value.toLowerCase().trim() === 'test') {
          resolve({invalidName: true});
        }
        resolve(null);
      }, 2000);
    });
    return promise;
  }
}
