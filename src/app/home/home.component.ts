import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  // Fix styleUrl to styleUrls
})
export class HomeComponent {

  drinkOfTheDay: string | null = null;

  constructor(private http: HttpClient) {}

  getDrinkOfTheDay(): void {
    const apiUrl = 'https://p78z5zxxk0.execute-api.eu-west-1.amazonaws.com/test/';  // Your Lambda endpoint

    this.http.get<{ statusCode: number, body: { message: string } }>(apiUrl).subscribe(
      (response) => {
        // Accessing the message inside the body of the response
        this.drinkOfTheDay = response.body.message;
      },
      (error) => {
        console.error('Error fetching drink of the day:', error);
      }
    );
  }
}