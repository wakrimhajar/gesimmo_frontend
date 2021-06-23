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
import { BienUserComponent } from './bien-user/bien-user.component';
import { DetailsImmobilierComponent } from './details-immobilier/details-immobilier.component';
import { SessionProprietaireComponent } from './session-proprietaire/session-proprietaire.component';
import { SessionLocataireComponent } from './session-locataire/session-locataire.component';
import { HeaderComponent } from './header/header.component';
import { EditPaiementComponent } from './edit-paiement/edit-paiement.component';
import { QuittancePaiementComponent } from './quittance-paiement/quittance-paiement.component';
import { ServiceHomeComponent } from './service-home/service-home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ModePaiementComponent } from './mode-paiement/mode-paiement.component';
import { RemisePaiementComponent } from './remise-paiement/remise-paiement.component';



const routes: Routes = [
  { path:'' ,
  component: HomeComponent },
  {
    path:'details/:id',
    component:DetailsImmobilierComponent
  },
  {
    path:'service-home',
    component:ServiceHomeComponent
  },
  {
    path:'contacts',
    component:ContactsComponent
  },
 { path: '', canActivate: [AuthGuard], children: [
  {
    path:'header/:id',
    component:HeaderComponent
  },
  {
    path:'session-proprietaire/:id',
    component:SessionProprietaireComponent
  },
]},
{ path: '', canActivate: [AuthGuard], children: [
  {
    path:'header/:id',
    component:HeaderComponent
  },
  {
    path:'session-locataire/:id',
    component:SessionLocataireComponent
  },
]},
 // children:[
  {
      path: '', canActivate: [AuthGuard], children: [
        {
          path:'header/:id',
          component:HeaderComponent
        },
        { path:'dashboar/:id',
        component: DashboardComponent },
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
          path:'details-paiement/:id',
          component:EditPaiementComponent
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
          path:'quittance_details/:id',
          component:QuittancePaiementComponent
          //component:EditPaiementComponent

        },
        //Nouveau
        {
          path:'modes_paiement/:id',
          component:ModePaiementComponent
          //component:EditPaiementComponent

        },
        {
          path:'r_paiement/:id',
          component:RemisePaiementComponent
          //component:EditPaiementComponent

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
        {
          path:'bien_user/:id',
          component:BienUserComponent
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
