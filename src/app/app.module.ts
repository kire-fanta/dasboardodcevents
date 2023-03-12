import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EvenementComponent } from './evenement/evenement.component';
import { SalleComponent } from './salle/salle.component';
import { EventsComponent } from './events/events.component';
import { BudgetComponent } from './budget/budget.component';
import { SalComponent } from './sal/sal.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { MotpasseComponent } from './motpasse/motpasse.component';
import { UserComponent } from './user/user.component';
// import { EvenementDetailsComponent } from './evenement-details/evenement-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    DashboardComponent,
    MenuComponent,
    NavbarComponent,
    FooterComponent,
    EvenementComponent,
    SalleComponent,
    EventsComponent,
    BudgetComponent,
    EvenementComponent,
    SalComponent,
    EventDetailsComponent,
    MotpasseComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
