import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { User } from '@ionic/cli';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'connexion',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(
    nom: string,
    prenom: string,
    username: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'inscrire',
      {
        nom,
        prenom,
        username,
        email,
        password,
      },
      httpOptions
    );
  }
  ModifierUser(
    nom: any,
    prenom: any,
    imageprofil: File,
    username: any,
    email: any,
    id: any
  ) {
    const data = new FormData();
    data.append('username', username);
    data.append('nom', nom);
    data.append('prenom', prenom);
    data.append('imageprofil', imageprofil);
    data.append('email', email);

    return this.http.put(`http://localhost:8080/user/update/${id}`, data);
  }

  ChangerMdp(
    currentpassword: any,
    newpassword: any,
    confirmpassword: any,
    email: any
  ): Observable<any> {
    // let data = new FormData();
    // data.append("jour",jourRdv)
    // data.append("heure",heureRdv)
    // data.append("objetRdv",objetRdv)
    const data = {
      currentpassword: currentpassword,
      newpassword: newpassword,
      confirmpassword: confirmpassword,
    };

    return this.http.post(
      `http://localhost:8080/api/auth/changePassword/${email}`,
      data
    );
  }

  getOneUserById(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/user/${id}`);
  }
}
