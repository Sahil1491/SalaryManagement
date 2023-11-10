// record-service.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordServiceService {
  baseUrl = "https://localhost:7260/api/Record/";

  constructor(private http: HttpClient) {}

  getAllRecords(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'GetAllRecord');
  }
}
