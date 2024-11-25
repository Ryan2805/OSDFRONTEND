import { Component, OnInit } from '@angular/core';
import { DrinkService } from '../drink.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-drinks-list',
  templateUrl: './drinks-list.component.html',
  styleUrls: ['./drinks-list.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatCardModule, MatInputModule]
})
export class DrinksListComponent implements OnInit {
  drinks: any[] = [];

  constructor(private drinkService: DrinkService) { }

  ngOnInit(): void {
    this.loadDrinks();
  }

  loadDrinks(): void {
    this.drinkService.getDrinks().subscribe(
      (data) => {
        this.drinks = data;
      },
      (error) => {
        console.error('Error fetching drinks:', error);
      }
    );
  }

  removeDrink(drinkId: string): void {
    this.drinkService.removeDrink(drinkId).subscribe(
      () => {
        console.log('Drink removed successfully');
        this.loadDrinks();  
      },
      (error: HttpErrorResponse) => {  
        console.error('Error removing drink:', error);
      }
    );

  } 
  updateDrink(drinkId: string, updatedDrink: any): void {
    this.drinkService.updateDrink(drinkId, updatedDrink).subscribe(
      () => {
        console.log('Drink updated successfully');
        this.loadDrinks(); 
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating drink:', error);
      }
    );
  }
}
