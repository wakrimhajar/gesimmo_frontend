import { Component, OnInit } from '@angular/core';
import { Location } from '../Model/location';
import { Router } from '@angular/router';
import { Bien } from '../Model/bien';
import { User } from '../Model/user';
import { JarwisService } from '../Services/jarwis.service';
import { TokenService } from '../Services/token.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
@Component({
    selector: 'app-create-location',
    templateUrl: './create-location.component.html',
    styleUrls: ['./create-location.component.css']
})
export class CreateLocationComponent implements OnInit {

    constructor(private Jarwis: JarwisService, private router: Router, private Token: TokenService) { }
    location = new Location();
    bien = new Bien();
    biens = [] as any;
    user = new User();
    users = [] as any;
    data:any;
    nomPro:string='';
    prenomPro:string='';
    cinPro:string='';
    adrPro:string='';
    civPro:string='';
    typeBien:string='';
    nomLoc:string='';
    prenomLoc:string=''
    cinLoc:string='';
    adrLoc:string='';
    civLoc:string='';
    duree:string='';
    date_entree:string='';
    date_sortie:string='';
    ngOnInit(): void {
        this.listLocataire();
        this.listActif();
    }

    onSubmit() {
        this.Jarwis.addlocation(this.location).subscribe(
            data => { console.log(data);
                this.data = data;
                const {LocBien,Prop} = this.data;
                this.nomLoc=LocBien[0].nom;
                this.prenomLoc=LocBien[0].prenom;
                this.cinLoc=LocBien[0].CIN;
                this.adrLoc=LocBien[0].adresse;
                this.civLoc=LocBien[0].civilite;
                this.duree=LocBien[0].duree;
                this.date_entree=LocBien[0].date_entree;
                this.date_sortie=LocBien[0].date_sortie;
                this.typeBien=LocBien[0].type;
                this.nomPro=Prop[0].nom;
                this.prenomPro=Prop[0].prenom;
                this.cinPro=Prop[0].CIN;
                this.adrPro=Prop[0].adresse;
                this.civPro=Prop[0].civilite;
                var doc = new jsPDF();
                doc.setFontSize(18);
                doc.text('CONTRAT DE LOCATION', 80, 20);
    
          doc.setFontSize(11);
          doc.text('ENTRE ', 13, 40);
          doc.text('Nom :',13,48);
          doc.text(this.nomPro,27,48);
          doc.text('Prenom :',58,48);
          doc.text(this.prenomPro,75,48);
          doc.text('N° CIN :',100,48);
          const nCINp = this.cinPro;
          doc.text(nCINp.toString(),115,48);
          doc.text('demeuré à :',13,56);
          doc.text(this.adrPro,35,56);
          doc.text('ci-après "le Bailleur"',150,66);

          doc.text('ET ', 13, 74);
          doc.text('Nom :',13,82);
          doc.text(this.nomLoc,27,82);
          doc.text('Prenom :',58,82);
          doc.text(this.prenomLoc,75,82);
          doc.text('N° CIN :',100,82);
          const nCINl = this.cinLoc;
          doc.text(nCINl.toString(),115,82);
          doc.text('demeuré à :',13,90);
          doc.text(this.adrLoc,35,90);
          doc.text('ci-après "le Locataire"',150,106);

          doc.text('Il a été convenu et arrêté ce qui suit.',13,120);
          doc.text(this.civPro,13,135);
          doc.text(this.nomPro,23,135);
          doc.text(this.prenomPro,50,135);
          doc.text('donne loyer à :',150,135);

          doc.text(this.civLoc,13,143);
          doc.text(this.nomLoc,23,143);
          doc.text(this.prenomLoc,50,143);
          doc.text('qui accepte, pour une durée de :',13,151);
          const duree = this.duree.toString();
          doc.text(duree,70,151);
          doc.text('ferme qui commencera à courir le :',80,151);
          doc.text(this.date_entree,143,151);
          doc.text('pour prendre fin le :',13,159);
          doc.text(this.date_sortie,50,159);
          doc.text('un',13,167);
          doc.text(this.typeBien,19,167);
          
          doc.setTextColor(100);
           // below line for Open PDF document in new tab
           doc.output('dataurlnewwindow')
           // below line for Download PDF document
           doc.save('contrat.pdf');
            
            },
            error => console.log(error)
     
        );
        this.location = new Location();
        this.router.navigate(['/location']);
    }

    listActif() {
        this.Jarwis.getbienLibre().subscribe(
            data => { console.log(data); this.biens = Object.values(data); }, error => console.log(error)
        );

    }
    listLocataire() {
        this.Jarwis.getLocPhyActif().subscribe(
            data => { console.log(data); this.users = Object.values(data); }, error => console.log(error)
        );
    }

    opensweetalert() {
        Swal.fire({
            title: 'Succés',
            text: 'Ajout avec succes!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK!',
            cancelButtonText: 'No, keep it'
        })
    }

    erreur() {
        Swal.fire({
            title: 'Ereur',
            text: 'Erreur!',
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK!',
            cancelButtonText: 'No, keep it'
        })
    }

    alert() {
        if (Object.values(this.location).length != 0)
            this.opensweetalert();
        else
            this.erreur();
    }


}