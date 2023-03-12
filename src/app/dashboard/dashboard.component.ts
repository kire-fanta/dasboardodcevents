import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { EventsService } from '../Service/events.service';
import { SallesService } from '../Service/salles.service';
import { StatusService } from '../Service/status.service';
import { TokenstorageService } from '../Service/tokenstorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
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

  searchText: any;
  p: number = 1;
  responsive = true;
  menuBureau: boolean = true;
  menuMobile: boolean = false;

  currentEvents: any[] = [];
  upcomingEvents: any;
  pastEvents: any[] = [];
  allEvents!: any[];
  list: any;
  state: any;
  selectedSegment: string | undefined;
  navCtrl: any;

  evenementstotal: any;
  sallestotal!: number;

  constructor(
    private eventsService: EventsService,
    private sallesService: SallesService,

    private tokenStorage: TokenstorageService,

    private statusService: StatusService
  ) {}

  televerser(event: any) {
    this.image = event.target['files'][0];
    console.log(this.image);
  }

  ngOnInit() {
    this.getevenement();
    this.getsalle();

    this.user = this.tokenStorage.getUser();
    this.selectedSegment = 'upcoming';

    this.GetEventByState('avenir');
    this.GetEventByState('encour');
    this.GetEventByState('termine');

    console.log('locationnnnn');
    this.user = this.tokenStorage.getUser();
    this.statusService.GetAllStatus().subscribe((data) => {
      this.status = data;
    });
    this.sallesService.getsallbydisponibilite(1).subscribe((data) => {
      this.mesSalles = data;
    });
  }

  GetEventByState(state: string) {
    return this.eventsService.FindEventsBystatus(state).subscribe((data) => {
      console.log(data);

      if (state == 'encour') {
        this.selectedSegment = 'current';
        this.currentEvents = data;
        console.log('current', this.currentEvents);
      }

      if (state == 'avenir') {
        this.selectedSegment = 'upcoming';
        this.upcomingEvents = data;
        console.log('upcomming', this.upcomingEvents);
      }

      if (state == 'termine') {
        this.selectedSegment = 'past';
        this.pastEvents = data;
        console.log(this.pastEvents);
        //  state == 'termine';
      }
    });
  }

  goToEvent(event: any) {
    this.navCtrl.navigateForward('events', {
      queryParams: {
        event: event,
      },
    });
  }

  afficheMenuMobile() {
    this.menuBureau = true;
    this.menuMobile = false;
  }
  getevenement() {
    this.eventsService.getAllEvenementsByStatus().subscribe((data) => {
      this.evenementstotal = data.length;
    });
  }
  getsalle() {
    this.sallesService.getSalles().subscribe((data) => {
      this.sallestotal = data.length;
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
    this.eventsService
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
