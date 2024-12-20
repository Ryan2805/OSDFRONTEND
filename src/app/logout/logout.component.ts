import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-logout',
  standalone: true,
  template: `<p>Logging out...</p>`,
  styles: [``]
})
export class LogoutComponent {

  constructor(private router: Router) {
    this.logout();
  }

  logout() {
    // Clear JWT and user data from local storage
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    sessionStorage.removeItem('jwt');  
   
    
  
    console.log('User logged out. JWT and user data removed from local storage.');
  
    
    setTimeout(() => {
      this.router.navigate(['/login']);  
    }, 2000);  
  }
  
}

