import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;

  constructor(builder: FormBuilder) {
    this.form = builder.group({
      userId: ['']
    });
  }

  useValue() {
    this.form.patchValue(this.form.value);
  }
}
