import { Component, OnInit, forwardRef } from '@angular/core';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder } from '@angular/forms';
import { DemoService } from '../demo.service';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserSelectorComponent),
      multi: true
    }
  ]
})
export class UserSelectorComponent implements ControlValueAccessor {
  users: any[];

  form: FormGroup;

  constructor(private service: DemoService, builder: FormBuilder) {
    service.getAll().subscribe(r => (this.users = r));

    this.form = builder.group({
      value: ['']
    });

    this.form.controls.value.valueChanges.subscribe(c => {
      this.onChange(c.id);
    });
  }

  writeValue(obj: number): void {
    if (obj) {
      const value = this.users.find(e => e.id == obj);
      if (value) this.form.patchValue({ value });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  onChange: any = () => {};
  onTouched: any = () => {};
}
