import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCustomService } from '../auth-custom.service';
import { LogoutComponent } from '../logout/logout.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authService: AuthCustomService, private router: Router) { }

 
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}