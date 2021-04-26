import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SocieteComponent } from './societe/societe.component';
import { LocataireComponent } from './locataire/locataire.component';
import { LocationComponent } from './location/location.component';
import { PaiementComponent } from './paiement/paiement.component';
import { ChargesComponent } from './charges/charges.component';
import { QuittanceComponent } from './quittance/quittance.component';
import { DocumentsComponent } from './documents/documents.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateLocPhyComponent } from './create-loc-phy/create-loc-phy.component';
import { CreateLocMorComponent } from './create-loc-mor/create-loc-mor.component';
import { CreateProprietaireComponent } from './create-proprietaire/create-proprietaire.component';
import { CreateSocieteComponent } from './create-societe/create-societe.component';
import { CreateLocationComponent } from './create-location/create-location.component';
import { CreateChargeComponent } from './create-charge/create-charge.component';
import { CreatePaiementComponent } from './create-paiement/create-paiement.component';
import { BienComponent } from './bien/bien.component';
import { CreateBienComponent } from './create-bien/create-bien.component';
import { DetailsFactureComponent } from './details-facture/details-facture.component';
import { AuthGuard } from './guards/auth.guard';
import { DetailsProprietaireComponent } from './details-proprietaire/details-proprietaire.component';
import { DetailsLocataireComponent } from './details-locataire/details-locataire.component';
import { EditProprietaireComponent } from './edit-proprietaire/edit-proprietaire.component';
import { DetailsBienComponent } from './details-bien/details-bien.component';
import { DetailsLocationComponent } from './details-location/details-location.component';
import { EditLocataireComponent } from './edit-locataire/edit-locataire.component';
import { EditBienComponent } from './edit-bien/edit-bien.component';
import { EditLocationComponent } from './edit-location/edit-location.component';
import { EditMoraleComponent } from './edit-morale/edit-morale.component';
import { EditLocmorComponent } from './edit-locmor/edit-locmor.component';
import { DetailsLocmorComponent } from './details-locmor/details-locmor.component';
import { DetailsSocieteComponent } from './details-societe/details-societe.component';

const routes: Routes = [
  { path:'' ,
  component: HomeComponent },
 // children:[
  {
      path: '', canActivate: [AuthGuard], children: [
        { path:'dashboard',
        component: DashboardComponent },
        { path:'societe',
        component: SocieteComponent },
        {
          path:'locataire',
          component:LocataireComponent
        },
        {
          path:'location',
          component:LocationComponent
        },
        {
          path:'bien',
          component:BienComponent
        },
        {
          path:'paiement',
          component:PaiementComponent
        },
        {
          path:'charges',
          component:ChargesComponent
        },
        {
          path:'quittance',
          component:QuittanceComponent
        },
        {
          path:'documents',
          component:DocumentsComponent
        },
        {
          path:'profile',
          component:ProfileComponent
        },
        {
          path:'create-loc-phy',
          component:CreateLocPhyComponent
        },
        {
          path:'create-loc-mor',
          component:CreateLocMorComponent
        },
        {
          path:'create-proprietaire',
          component:CreateProprietaireComponent
        },
        {
          path:'create-societe',
          component:CreateSocieteComponent
        },
        {
          path:'create-location',
          component:CreateLocationComponent
        },
        {
          path:'edit-p/:id',
          component:EditProprietaireComponent
        },
        {
          path:'create-charge',
          component:CreateChargeComponent
        },
        {
          path:'create-paiement',
          component:CreatePaiementComponent
        },
        {
          path:'create-bien',
          component:CreateBienComponent
        },
        {
          path:'details-facture/:id',
          component:DetailsFactureComponent
        },
        {
          path:'details-proprietaire/:id',
          component:DetailsProprietaireComponent
        },
        {
          path:'details-locataire/:id',
          component:DetailsLocataireComponent
        },
        {
          path:'details-bien/:id',
          component:DetailsBienComponent
        },
        {
          path:'details-location/:id',
          component:DetailsLocationComponent
        },
        {
          path:'edit-locataire/:id',
          component:EditLocataireComponent
        },
        {
          path:'edit-bien/:id',
          component:EditBienComponent
        },
        {
          path:'edit-location/:id',
          component:EditLocationComponent
        },
        {
          path:'edit-morale/:id',
          component:EditMoraleComponent
        },
        {
          path:'edit-locmor/:id',
          component:EditLocmorComponent
        },
        {
          path:'edit-locmor/:id',
          component:EditLocmorComponent
        },
        {
          path:'details-locmor/:id',
          component:DetailsLocmorComponent
        },
        {
          path:'details-societe/:id',
          component:DetailsSocieteComponent
        },
    ]
  }
 /*]
},*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
