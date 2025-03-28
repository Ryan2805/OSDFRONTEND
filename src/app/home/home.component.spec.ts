import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';  // Make sure the path is correct

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HomeComponent]  // Ensure HttpClientTestingModule is correctly imported
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update drinkOfTheDay when getDrinkOfTheDay is called', () => {
    const mockResponse = {
      statusCode: 200,
      body: { message: 'Lucozade' }
    };

    // Call the method to trigger the API request
    component.getDrinkOfTheDay();

    // Simulate the API response
    const req = httpMock.expectOne('https://p78z5zxxk0.execute-api.eu-west-1.amazonaws.com/test/');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    // Assert that the drinkOfTheDay is updated
    expect(component.drinkOfTheDay).toBe('Lucozade');

    // Verify no outstanding HTTP requests
    httpMock.verify();
  });

  afterEach(() => {
    // Clean up after each test to ensure no requests are left over
    httpMock.verify();
  });
});
