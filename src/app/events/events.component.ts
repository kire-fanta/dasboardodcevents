
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { EventsService } from '../Service/events.service';
import { SallesService } from '../Service/salles.service';
import { StatusService } from '../Service/status.service';
import { TokenstorageService } from '../Service/tokenstorage.service';
import { UsersService } from '../Service/users.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
goBack() {
}
  user: any;

  location: string = 'inside';
  location1: any;
  rooms: string[] = ['Salle 1', 'Salle 2', 'Salle 3'];

  nom: any;
  lieu: any;

  description: any;
  etat: any;
  typeEvenement: any;
  duree: any = 10;
  status: any;
  image: any;
  organisateurs!: string;
  type!: string;
  date!: string;
  heureDebut: any;
  event: any;
  heureFin: any;
  id_user: any;
  id_status: any;
  datefin: any;
  datedebut: any;
  users: any;
  mesSalles: any;
  Resultat: any;
  constructor(
    private eventsservice: EventsService,
    private servicet: TokenstorageService,
    private statusService: StatusService,
    private salleservices: SallesService
  ) {}
  televerser(event: any) {
    this.image = event.target['files'][0];
    console.log(this.image);
  }

  ngOnInit() {
    console.log('locationnnnn');
    this.user = this.servicet.getUser();
    this.statusService.GetAllStatus().subscribe((data) => {
      this.status = data;
    });
    this.salleservices.getsallbydisponibilite(1).subscribe((data) => {
      this.mesSalles = data;
    });
  }

  onLocationChange(location: any) {
    this.location1 = location.target.value;
    console.log(location.target.value);
  }

  onRoomChange(event: any) {
    console.log(event);
    this.location1 = event.target.value;
    // Faites quelque chose avec la salle sélectionnée
  }

  ajouterEvenement() {
    if (this.location1 == 'outside') {
      this.lieu = this.location;
    } else {
      this.lieu = this.location1;
    }
    console.log('ajouterEvenement');
    this.eventsservice
      .ajouterEvenement(
        this.description,
        this.nom,
        this.lieu,
        this.etat,
        this.duree,
        this.status,
        this.image,
        this.type,
        this.user.id,
        this.id_status,
        this.heureDebut,
        this.heureFin,
        this.datedebut,
        this.datefin
      )

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
            text: 'Evénement ajouté avec succès',
            showConfirmButton: false,
            timer: 2500,
          });
        }

        console.log(this.Resultat.message);
      });
    this.location = 'inside';
  }
}
