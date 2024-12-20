import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GradeHistoryComponent } from '../grade-history/grade-history.component';
import { TestFormComponent } from './test-form/test-form.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { DrinksListComponent } from './drinks-list/drinks-list.component';
import { LogoutComponent } from './logout/logout.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', redirectTo: '/' },
    { path: 'grade-history', component: GradeHistoryComponent},
    { path: 'form', component: TestFormComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'drinks', component: DrinksListComponent},
    { path: 'logout', component: LogoutComponent},
];