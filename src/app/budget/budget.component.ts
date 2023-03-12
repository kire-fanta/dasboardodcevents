import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BudgetService } from '../Service/budget.service';
import { EventsService } from '../Service/events.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
  providers: [BudgetService, EventsService],
})
export class BudgetComponent implements OnInit {
  menuBureau: boolean = true;
  menuMobile: boolean = false;

  goBack() {
    throw new Error('Method not implemented.');
  }
  showBudget(arg0: any) {
    throw new Error('Method not implemented.');
  }
  prevision: any;
  events: any;
  budgettotal: any;
  mont = 0;

  tableau: any = [];
  totaux = 0;

  constructor(
    private eventsService: EventsService,
    private budgetService: BudgetService,
    private router: Router,
    private navCtrl: NavController,
    private evenetService: EventsService
  ) {}

  ngOnInit(): void {
    this.getAllPrevisions();
    this.getAllEvents();
  }

  getAllPrevisions(): void {
    this.budgetService.getAllPrevisions().subscribe((previsions) => {
      this.prevision = previsions;
    });
  }

  addPrevision(): void {
    this.router.navigate(['/add-prevision']);
  }

  editPrevision(id: number): void {
    this.router.navigate(['/edit-prevision/' + id]);
  }

  supprimerPrevision(idPrevision: number): void {
    this.budgetService.supprimerPrevision(idPrevision).subscribe((data) => {
      this.getAllPrevisions();
    });
  }

  getAllEvents(): void {
    this.budgetService.getEvens().subscribe((events) => {
      this.events = events;
      for (let a of this.events) {
        console.log('ID ' + a.idEvenement);
      }
      for (let b of this.events) {
        this.evenetService.getbudgetbyevent(b.idEvenement).subscribe((data) => {
          for (let m of data) {
            this.mont = m.prixUnitaire * m.quantite;
            this.totaux += this.mont;
            this.tableau.push(this.totaux);
          }
        });
      }
      console.log('Ev3 ' + this.tableau);
    });
  }

  goToEventDetails(event: any, idevent: any): void {
    this.navCtrl.navigateForward('event-details/' + idevent, {
      queryParams: {
        event: event,
      },
    });
  }
  afficheMenuMobile() {
    this.menuBureau = true;
    this.menuMobile = false;
  }
}
