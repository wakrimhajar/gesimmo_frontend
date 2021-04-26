import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule} from '@angular/common/http';
import { JarwisService } from './Services/jarwis.service';
import { AuthService } from './Services/auth.service';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
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
import { AuthInterceptor } from './Services/auth.interceptor';
import { CreateLocationComponent } from './create-location/create-location.component';
import { CreateChargeComponent } from './create-charge/create-charge.component';
import { CreatePaiementComponent } from './create-paiement/create-paiement.component';
import { BienComponent } from './bien/bien.component';
import { CreateBienComponent } from './create-bien/create-bien.component';
import { DetailsFactureComponent } from './details-facture/details-facture.component';
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
import { DetailsSocieteComponent } from './details-societe/details-societe.component';
import { DetailsLocmorComponent } from './details-locmor/details-locmor.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    SocieteComponent,
    LocataireComponent,
    LocationComponent,
    PaiementComponent,
    ChargesComponent,
    QuittanceComponent,
    DocumentsComponent,
    ProfileComponent,
    CreateLocPhyComponent,
    CreateLocMorComponent,
    CreateProprietaireComponent,
    CreateSocieteComponent,
    CreateLocationComponent,
    CreateChargeComponent,
    CreatePaiementComponent,
    BienComponent,
    CreateBienComponent,
    DetailsFactureComponent,
    DetailsProprietaireComponent,
    DetailsLocataireComponent,
    EditProprietaireComponent,
    DetailsBienComponent,
    DetailsLocationComponent,
    EditLocataireComponent,
    EditBienComponent,
    EditLocationComponent,
    EditMoraleComponent,
    EditLocmorComponent,
    DetailsSocieteComponent,
    DetailsLocmorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [JarwisService,
              AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
