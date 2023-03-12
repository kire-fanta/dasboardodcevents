import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { SalComponent } from '../sal/sal.component';
import { SallesService } from '../Service/salles.service';

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.css'],
})
export class SalleComponent implements OnInit {
  menuBureau: boolean = true;
  menuMobile: boolean = false;
  pvrCtlr: any;

  async opennotif() {
    let popup = await this.pvrCtlr.create({
      component: SalComponent,
      cssClass: 'popover-content',

      // buttons:[{
      //   role:"cancel",
      //   icon:"close",
      // }]
    });
    popup.present();
  }

  // opennotif() {
  //   throw new Error('Method not implemented.');
  // }
  mesSalles: any;
  salle: any;
  constructor(
    private salleservices: SallesService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.toutesLesSalles();
  }

  toutesLesSalles() {
    this.salleservices.getSalles().subscribe((data) => {
      this.mesSalles = data;
    });
  }

  supprimer(id: number) {
    Swal.fire({
      position: 'center',
      title: 'Voulez-vous supprimer ?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Oui',
      denyButtonText: 'Oui',
      icon: 'warning',
      denyButtonColor: 'red',
      // cancelButtonText: 'Annuler',
      cancelButtonColor: 'red',
      confirmButtonColor: 'green',
      heightAuto: false,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //Swal.fire('Saved!', '', 'success');
        this.salleservices.deletesall(id).subscribe((data) => {
          this.salle = data;
          console.log(data);
          this.toutesLesSalles();
        });
      }
    });
  }
  afficheMenuMobile() {
    this.menuBureau = true;
    this.menuMobile = false;
  }
}
