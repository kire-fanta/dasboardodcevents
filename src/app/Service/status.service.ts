import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http:HttpClient) { }

  GetAllStatus(): Observable<any> {
    return this.http.get('http://localhost:8080/status/all')
  }
}
