import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DrinkService {
  private drinksUrl = environment.drinksEndpoint;  

  constructor(private http: HttpClient) {}

 
  getDrinks(): Observable<any[]> {
    return this.http.get<any[]>(this.drinksUrl);
  }

 
  addDrink(drink: any): Observable<any> {
    return this.http.post(this.drinksUrl, drink);
  }
  removeDrink(drinkId: string): Observable<any> {
    return this.http.delete(`${this.drinksUrl}/${drinkId}`);
  }
  updateDrink(drinkId: string, updatedDrink: any): Observable<any> {
    return this.http.put(`${this.drinksUrl}/${drinkId}`, updatedDrink);
  }
}