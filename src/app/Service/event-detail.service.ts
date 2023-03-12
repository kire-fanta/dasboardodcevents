import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventDetailService {
  private baseUrl = 'http://localhost:8080/previsions-depenses/add/';

  constructor(private http: HttpClient) {}

  getBudgetss(eventId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${eventId}`);
  }
  getAllPrevisions(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/previsions-depenses/all');
  }
  getPrevisionById(idPrevision: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${idPrevision}`);
  }

  calculateTotalBudget(budgets: any[]): number {
    return budgets.reduce((total, budget) => total + budget.budget, 0);
  }
}