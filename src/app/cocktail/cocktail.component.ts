import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cocktail',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.css']
})
export class CocktailComponent implements OnInit {
  cocktails: any[] = [];
  currentPage: number = 1;
  cocktailsPerPage: number = 9; 
  totalCocktails: number = 0;
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCocktails();
  }

  getCocktails(): void {
    this.loading = true;
    const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`;

    this.http.get<any>(apiUrl).subscribe((response) => {
      this.totalCocktails = response.drinks.length;
      this.paginateCocktails(response.drinks);
      this.loading = false;
    });
  }

  paginateCocktails(drinks: any[]): void {
   
    const startIndex = (this.currentPage - 1) * this.cocktailsPerPage;
    const endIndex = startIndex + this.cocktailsPerPage;
    this.cocktails = drinks.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage * this.cocktailsPerPage < this.totalCocktails) {
      this.currentPage++;
      this.getCocktails(); 
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getCocktails(); 
    }
  }
}
