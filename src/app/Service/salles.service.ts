
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salle } from '../Model/salle.model';

@Injectable({
  providedIn: 'root',
})
export class SallesService {
  create(arg0: { component: any }) {
    throw new Error('Method not implemented.');
  }
  dismiss() {
    throw new Error('Method not implemented.');
  }
  private sallesUrl = 'api/salles';
  private urlbase: String = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}

  getSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(this.urlbase + 'salles/afficher');
  }

  getsallbydisponibilite(status:any): Observable<Salle[]> {
    return this.http.get<Salle[]>(
      this.urlbase + `salles/disponibilite/${status}`
    );

   } 
  getSalle(id: number): Observable<Salle> {
    const url = `${this.sallesUrl}/${id}`;
    return this.http.get<Salle>(url);
  }

  // updateSalle(salle: Salle): Observable<any> {
  //   return this.http.put<Salle>(this.urlbase + `salle/${id}`);
  // }

  addSalle(
    image: File,
    nombreplace: any,
    libelle: string,
    etage: string,
    disponibilite: any,
    description: string,
    numero: any
  ): Observable<Salle> {
    const data = new FormData();
    data.append('file', image);
    data.append('nombreplace', nombreplace);
    data.append('libelle', libelle);
    data.append('etage', etage);
    data.append('disponibilite', disponibilite);
    data.append('description', description);
    data.append('numero', numero);
    return this.http.post<Salle>(`http://localhost:8080/salles/add`, data);
  }

  // deleteSalle(salle: Salle | number): Observable<any> {
  //   const id = typeof salle === 'number' ? salle : salle.id;
  //   const url = `${this.sallesUrl}/${id}`;

  //   return this.http.delete<Salle>(`http://localhost:8080/salles/${id}`);
  // }

  deletesall(id: number): Observable<any> {
    
    return this.http.delete(`http://localhost:8080/salles/${id}`);
    
}
}