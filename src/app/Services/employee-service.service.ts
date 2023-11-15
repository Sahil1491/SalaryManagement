import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  private baseUrl = 'https://localhost:7126/api/Report'; // Update with your actual API base URL

  constructor(private http: HttpClient) { }

  getMonths(): Observable<string[]> {
    const url = `${this.baseUrl}/all-months`; // Assuming you have an endpoint for fetching months
    return this.http.get<string[]>(url);
  }

  getAllEmployees(): Observable<any[]> {
    const url = `${this.baseUrl}/all-employees`;
    return this.http.get<any[]>(url);
  }
}
