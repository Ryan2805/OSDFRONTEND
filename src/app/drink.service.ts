import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrinkService {
  private apiUrl = 'http://localhost:3000/api/v1/drinks';  

  constructor(private http: HttpClient) {}

 
  getDrinks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

 
  addDrink(drink: any): Observable<any> {
    return this.http.post(this.apiUrl, drink);
  }
  removeDrink(drinkId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${drinkId}`);
  }
  updateDrink(drinkId: string, updatedDrink: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${drinkId}`, updatedDrink);
  }
}