import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { EventsService } from '../Service/events.service';

@Component({
  selector: 'app-evenement-detail',
  templateUrl: './evenement-details.component.html',
  styleUrls: ['./evenement-details.component.css'],
})
export class EvenementDetailComponent implements OnInit {
  evenementSelectionne: any;
  Tableau: any;
  idev: any;
  lieu: any;
  description: any;
  nomEvenement: any;
  typeEvenement: any;
  datefin: any;
  datedebut: any;

  constructor(
    private route: ActivatedRoute,
    private eventServic: EventsService
  ) {
    
  }

  ngOnInit() {
    this.idev = this.route.snapshot.params['id'];
    console.log(this.idev)
    this.eventServic.getEvenementById(this.idev).subscribe((data) => {
      this.evenementSelectionne = data;
      this.lieu = data.lieu;
      this.description = data.description;
      this.nomEvenement = data.nomEvenement;
      this.typeEvenement = data.typeEvenement;
      this.datedebut = data.datedebut;
      this.datefin = data.datefin;
    });
  }
}
