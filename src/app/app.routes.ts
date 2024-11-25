import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GradeHistoryComponent } from '../grade-history/grade-history.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', redirectTo: '/' },
    { path: 'grade-history', component: GradeHistoryComponent},
];