import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrinksListComponent } from './drinks-list.component';
import { DrinkService } from '../drink.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('DrinksListComponent', () => {
  let component: DrinksListComponent;
  let fixture: ComponentFixture<DrinksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DrinksListComponent,
        HttpClientTestingModule,
        MatButtonModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        ReactiveFormsModule,
        CommonModule
      ],
      providers: [DrinkService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrinksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty drinks list on initialization', () => {
    expect(component.drinks).toEqual([]);
  });
});