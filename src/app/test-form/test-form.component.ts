import { Component } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule,FormBuilder,FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.css'
})
export class TestFormComponent {
  gradeHistoryForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.gradeHistoryForm = this.formBuilder.group({
            class_id: [''],
            student_id: [''],
            grades: this.formBuilder.array([]) 
        });
    }

    
    get grades(): FormArray {
        return this.gradeHistoryForm.get('grades') as FormArray;
    }

   
    addGrade(): void {
        const gradeGroup = this.formBuilder.group({
            id: [this.generateId()],
            type: [''], 
            score: [''], 
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

    onSubmit() {
        console.log('Form submitted with:');
        console.table(this.gradeHistoryForm.value);
    }
}
