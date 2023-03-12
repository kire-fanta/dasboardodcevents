import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenstorageService } from '../Service/tokenstorage.service';
import { UsersService } from '../Service/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  errorMessage = '';
  roles: string[] = [];
  form: any = {
    username: null,
    password: null,
  };
  Resultat: any;
  isLoginFailed = false;
  isLoggedIn = false;
  memoire = localStorage.getItem('logge');

  constructor(
    private route: Router,
    private authService: UsersService,
    private tokenStorage: TokenstorageService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    if (this.memoire == 'true') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    if (this.isLoggedIn === true) {
      this.route.navigateByUrl('/tabs/accueil');
    }
  }
  menuBureau: boolean = true;
  menuMobile: boolean = false;

  afficheMenuMobile() {
    this.menuBureau = true;
    this.menuMobile = false;
  }
  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        localStorage.setItem('logge', 'true');
        this.roles = this.tokenStorage.getUser().roles;
        if (this.isLoggedIn == true) this.route.navigate(['tabs/accueil']);
        else {
          this.isLoginFailed = true;
        }
      },
      (err) => {
        this.isLoginFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }
  // ngOnDestroy(): void {
  //   throw new Error('Method not implemented.');
  // }

  onSubmit1(): void {
    const { nom, prenom, username, email, password } = this.form;
    this.userService
      .register(nom, prenom, username, email, password)
      .subscribe((data) => {
        this.Resultat = data;

        if (this.Resultat.message == '') {
          Swal.fire({
            heightAuto: false,

            icon: 'warning',
            text: 'La date debut ne peut pas etre avant la date de fin',
            showConfirmButton: false,
            timer: 2500,
          });
        } else {
          Swal.fire({
            heightAuto: false,

            icon: 'success',
            iconColor: '#ff6600',
            text: 'Utilisateur ajouté avec succès',
            showConfirmButton: false,
            timer: 2500,
          });
        }

        console.log(this.Resultat.message);
      });
  }
}
