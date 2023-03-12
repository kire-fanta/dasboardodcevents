import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../Service/budget.service';
import { EventDetailService } from '../Service/event-detail.service';
import { EventsService } from '../Service/events.service';
import { AlertController } from '@ionic/angular';

@Component({
selector: 'app-event-details',
templateUrl: 'event-details.component.html',
styleUrls: ['event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
event: any;
budgets: any;
budgettotal: any;
budget: any;
getbudgetbyevent: any;
budgetsUn: any;
idev: any;
montant = 0;
monTotal = 0;

constructor(
private route: ActivatedRoute,
private budgetService: BudgetService,
private eventService: EventDetailService,
private eventServic: EventsService,
private alertController: AlertController
) {}

ngOnInit() {
this.idev = this.route.snapshot.params['id'];

this.route.queryParams.subscribe((params) => {
  this.event = params['event'];

  this.eventService.getAllPrevisions().subscribe((data) => {
    this.budgets = data;
  });

  this.eventServic.getbudgetbyevent(this.idev).subscribe((data) => {
    this.budgetsUn = data;
    for (let total of this.budgetsUn) {
      this.montant = total.prixUnitaire * total.quantite;
      this.monTotal += this.montant;
    }
  });

  this.eventService.getBudgetss(this.event.id).subscribe((data) => {
    this.budget = data;
  });
});
}

async ajouterBudget() {
this.idev = this.route.snapshot.params['id'];


const alert = await this.alertController.create({
  header: 'Ajouter un budget',
  inputs: [
    {
      name: 'libelle',
      type: 'text',
      placeholder: 'Libellé',
    },
    {
      name: 'prixUnitaire',
      type: 'number',
      placeholder: 'Prix unitaire',
    },
    {
      name: 'quantite',
      type: 'number',
      placeholder: 'Quantité',
    },
    {
      name: 'montant',
      type: 'number',
      placeholder: 'Montant',
    },
  ],
  buttons: [
    {
      text: 'Annuler',
      role: 'cancel',
    },
    {
      text: 'Ajouter',
      handler: (data) => {
        console.log("Frrr "+data);
        this.budgetService.gererPrevision(data ).subscribe((donnee) => {});
      },
    },
  ],
});

await alert.present();
}
}
