import { Component, OnInit } from '@angular/core';
import { UsersService } from '../Service/users.service';
import { NavController } from '@ionic/angular';
import { TokenstorageService } from '../Service/tokenstorage.service';

@Component({
  selector: 'app-motpasse',
  templateUrl: './motpasse.component.html',
  styleUrls: ['./motpasse.component.css'],
})
export class MotpasseComponent implements OnInit {
  user: any;
  changer: any;

  modif1: any = {
    numeroOrEmail: null,
    currentpassword: null,
    newpassword: null,
    confirmpassword: null,
  };

  constructor(
    private authService: UsersService,
    private storage: TokenstorageService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.user = this.storage.getUser();
  }

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

  goBack() {
    this.navCtrl.back();
  }
}
