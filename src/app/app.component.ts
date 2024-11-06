import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GradeHistoryComponent } from '../grade-history/grade-history.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GradeHistoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularWS';
}
