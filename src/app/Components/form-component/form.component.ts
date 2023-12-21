import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Developer } from '../../Models/developer.model';
import { FormService } from '../../services/developer.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private formService: FormService) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      projects: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      unitType: ['', [Validators.required]],
      level: ['', [Validators.required]],
      location: ['', [Validators.required]],
      exposure: ['', [Validators.required]],
      size: ['', [Validators.required]],
      bedRoom: [{value: 0, disabled: true}],
      bathRoom: [{value: 0, disabled: true}],
      parking: [false],
      locker: [false],
      balcony: [false],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.form.get('bedRoom')?.enable();
      this.form.get('bathRoom')?.enable();
      const formData: Developer = this.form.value;
      this.formService.submitForm(formData).subscribe(
        (response) => {
          this.router.navigate(['table']);
          console.log('Form Submitted successfully:', response);
        },
        (error) => {
          console.error('Error submitting form:', error);
        }
      );
    }
  }

  increment(field: string): void {
    const currentValue = this.form.get(field)?.value;
    this.form.get(field)?.setValue(currentValue + 1);
  }

  decrement(field: string): void {
    const currentValue = this.form.get(field)?.value;
    if (currentValue > 0) {
      this.form.get(field)?.setValue(currentValue - 1);
    }
  }
}
