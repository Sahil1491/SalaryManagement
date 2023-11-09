import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordServiceService {
  baseUrl = "https://localhost:7260/api/Record/";
  

  constructor(private http: HttpClient) {}

  getAllRecords() {
    return this.http.get(this.baseUrl + 'GetAllRecord');
  }
}
