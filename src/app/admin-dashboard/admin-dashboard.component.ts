import { Component, OnInit } from '@angular/core';
import { AuthCustomService } from '../auth-custom.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  totalUsers: number = 0;
  totalDrinks: number = 0;

  constructor(private authService: AuthCustomService) { }

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  // Fetch total users and drinks from the database
  fetchDashboardData() {
    // Fetch total users count
    this.authService.getTotalUsers().subscribe((users: number) => {
      this.totalUsers = users;  // Ensure you get the correct number
    });

    // Fetch total drinks count
    this.authService.getTotalDrinks().subscribe((drinks: number) => {
      this.totalDrinks = drinks;  // Ensure you get the correct number
    });
  }
}