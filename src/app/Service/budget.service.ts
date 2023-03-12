import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  getBudgets(id: any) {
    throw new Error('Method not implemented.');
  }
  deletePrevision(id: number) {
    throw new Error('Method not implemented.');
  }

  private baseUrl = 'http://localhost:8080/previsions-depenses/add/';

  constructor(private http: HttpClient) {}

  calculerDepense(id: number): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8080/previsions-depenses/calculer-depense/${id}`
    );
  }

  gererPrevision(prevision: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/gerer`, prevision);
  }

  getAllPrevisions(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/previsions-depenses/all');
  }

  supprimerPrevision(idPrevision: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${idPrevision}`);
  }

  getPrevisionById(idPrevision: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${idPrevision}`);
  }
  getEvens(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/evenements/all/');
  }
}


