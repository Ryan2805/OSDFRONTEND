import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { DrinkService } from '../drink.service';
@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatCardModule, MatInputModule],
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent {
  drinkForm: FormGroup;
  formSubmitted = false;

  constructor(private formBuilder: FormBuilder, private drinkService: DrinkService) {
    this.drinkForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', Validators.required],
      volume: ['', [Validators.required, Validators.min(1)]],
      alcoholContent: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  get name() {
    return this.drinkForm.get('name');
  }

  get type() {
    return this.drinkForm.get('type');
  }

  get volume() {
    return this.drinkForm.get('volume');
  }

  get alcoholContent() {
    return this.drinkForm.get('alcoholContent');
  }

  get price() {
    return this.drinkForm.get('price');
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.drinkForm.valid) {
      const newDrink = this.drinkForm.value;  
      this.drinkService.addDrink(newDrink).subscribe(
        (response) => {
          console.log('Drink added successfully:', response);
          this.drinkForm.reset();  
        },
        (error) => {
          console.error('Error adding drink:', error);
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }
}