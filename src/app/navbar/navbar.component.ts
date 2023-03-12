import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenstorageService } from '../Service/tokenstorage.service';
import { UsersService } from '../Service/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  storage: any;
  userService: any;
  changer: any;
  nomUser: any;

  constructor(
    private authService: UsersService,
    private route: Router,
    private tokenStorage: TokenstorageService,
    private usersService: UsersService
  ) {}

  imageprofil: any;
  imageUrl: string = 'http://localhost:8080/images/user/';
  user: any;
  id!: number;
  modifs: any;
  nom!: string;
  prenom!: string;
  username!: string;
  modif: any = {
    nom: null,
    prenom: null,
    username: null,
  };
  userId: any;
  back() {
    throw new Error('Method not implemented.');
  }
  updatePassword() {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.userId = this.tokenStorage.getUser().id;
    console.log(this.userId + ' is already');
    //this.id = this.route.snapshot.params['id'];
    setTimeout(() => {
      this.getOneUser();
    }, 500);
    console.log(this.user);
  }
  logOut: any;
  onProfilePictureSelected(evente: any) {
    this.imageprofil = evente.target['files'][0];
    console.log(this.imageprofil);
  }

  onSubmit(): void {
    this.userService
      .ModifierUser(
        this.nom,
        this.prenom,
        this.imageprofil,
        this.username,
        this.email,
        this.userId
      )
      .subscribe((data: any) => {
        this.modifs = data;
        console.log(data);
      });
  }
  email(
    nom: string,
    prenom: string,
    imageprofil: any,
    username: string,
    email: any,
    userId: any
  ) {
    throw new Error('Method not implemented.');
  }
  getOneUser() {
    this.usersService.getOneUserById(this.userId).subscribe((data: any) => {
      this.user = data;
      this.nomUser = this.user.nom
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  logout(): void {
    this.tokenStorage.signOut();
    this.route.navigateByUrl('connexion');
  }
  // logout(): void {
  //   this.storage.signOut();
  //   this.route.navigateByUrl('home');
  //   this.reloadPage();
  // }
  modif1: any = {
    numeroOrEmail: null,
    currentpassword: null,
    newpassword: null,
    confirmpassword: null,
  };
  ModifierMotdepasse() {
    this.authService
      .ChangerMdp(
        this.modif1.currentpassword,
        this.modif1.newpassword,
        this.modif1.confirmpassword,
        this.user.email
      )
      .subscribe((data) => {
        this.changer = data;
        console.log(data);
      });
  }
}
