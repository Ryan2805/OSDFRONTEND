import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatButtonModule,MatFormFieldModule,MatCardModule,MatInputModule],
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css'] 
})
export class TestFormComponent {
  gradeHistoryForm: FormGroup;
  formSubmitted = false;  

  constructor(private formBuilder: FormBuilder) {
    this.gradeHistoryForm = this.formBuilder.group({
      class_id: ['', [Validators.required, Validators.minLength(3)]], 
      student_id: ['', Validators.required], 
      grades: this.formBuilder.array([]) 
    });
  }

  get grades(): FormArray {
    return this.gradeHistoryForm.get('grades') as FormArray;
  }

  addGrade(): void {
    const gradeGroup = this.formBuilder.group({
      id: [this.generateId()],
      type: ['', Validators.required], 
      score: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    });
    this.grades.push(gradeGroup);
  }

  generateId(): string {
    return 'grade-' + Math.random().toString(36).substr(2, 9);
  }

  removeGrade(index: number): void {
    this.grades.removeAt(index);
  }

  trackById(index: number, grade: any): string {
    return grade.value.id;
  }

  get class_id() {
    return this.gradeHistoryForm.get('class_id');
  }

  get student_id() {
    return this.gradeHistoryForm.get('student_id');
  }

  onSubmit() {
    this.formSubmitted = true;  
    if (this.gradeHistoryForm.valid) {
      console.log('Form submitted with:');
      console.table(this.gradeHistoryForm.value);
    } else {
      console.log('Form is not valid');
    }
  }
}
