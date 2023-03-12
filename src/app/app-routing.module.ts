import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetComponent } from './budget/budget.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EvenementDetailComponent } from './evenement-details/evenement-details.component';
import { EvenementComponent } from './evenement/evenement.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventsComponent } from './events/events.component';
import { MotpasseComponent } from './motpasse/motpasse.component';
import { SalComponent } from './sal/sal.component';
import { SalleComponent } from './salle/salle.component';
import { PermissionService } from './Service/permission.service';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'connexion',
    pathMatch: 'full',
  },
  { path: 'connexion', component: ConnexionComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [PermissionService],
  },
  {
    path: 'evenement',
    component: EvenementComponent,
    canActivate: [PermissionService],
  },
  {
    path: 'evenement-details/:id',
    component: EvenementDetailComponent,
    canActivate: [PermissionService],
  },
  {
    path: 'event-details/:id',
    component: EventDetailsComponent,
    canActivate: [PermissionService],
  },
  {
    path: 'motpasse',
    component: MotpasseComponent,
    canActivate: [PermissionService],
  },
  // {
  //   path: 'salle',
  //   component: SalleComponent,
  //   canActivate: [PermissionService],
  // },

  {
    path: 'events',
    component: EventsComponent,
    canActivate: [PermissionService],
  },
  {
    path: 'sal',
    component: SalComponent,
    canActivate: [PermissionService],
  },
  {
    path: 'salle',
    component: SalleComponent,
    canActivate: [PermissionService],
  },
  {
    path: 'budget',
    component: BudgetComponent,
    canActivate: [PermissionService],
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [PermissionService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
