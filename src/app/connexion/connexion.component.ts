import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenstorageService } from '../Service/tokenstorage.service';
import { UsersService } from '../Service/users.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent {
  form: any = {
    username: null,
    password: null,
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;
  role: any;
  showAdminBoard: any;
  showModeratorBoard: any;
  username: any;

  eventBusService: any;

  roles: string[] = [];
  modal: any;
  constructor(
    private authService: UsersService,
    private tokenStorage: TokenstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // if (this.tokenStorage.getToken()) {
    //   this.isLoggedIn = true;
    //   this.roles = this.tokenStorage.getUser().roles;
    // }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;

        this.router.navigate(['/dashboard']);
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }
}
