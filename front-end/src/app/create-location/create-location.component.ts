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
    adresseBien:string='';
    etage:string='';
    porte:string='';
    equipements:string='';
    typeLoaction:string='';
    ngOnInit(): void {
        this.listLocataire();
        this.listActif();
    }

    onSubmit() {
        this.Jarwis.addlocation(this.location).subscribe(
            data => { console.log(data);
                this.data = data;
                const {Loc,Bien,Prop} = this.data;
                this.nomLoc=Loc[0].nom;
                this.prenomLoc=Loc[0].prenom;
                this.cinLoc=Loc[0].CIN;
                this.adrLoc=Loc[0].adresse;
                this.civLoc=Loc[0].civilite;
                this.typeLoaction=Loc[0].type;
                this.adresseBien=Bien[0].adresse;
                this.duree=Bien[0].duree;
                this.date_entree=Bien[0].date_entree;
                this.date_sortie=Bien[0].date_sortie;
                this.typeBien=Bien[0].type;
                this.etage=Bien[0].etage;
                this.porte=Bien[0].porte;
                this.equipements=Bien[0].equipement;
                this.nomPro=Prop[0].nom;
                this.prenomPro=Prop[0].prenom;
                this.cinPro=Prop[0].CIN;
                this.adrPro=Prop[0].adresse;
                this.civPro=Prop[0].civilite;
                if(this.typeBien==="Appartement" || this.typeBien==="Bureau" || this.typeBien==="Studio"){
                var doc = new jsPDF();
                doc.setFontSize(18);
                doc.text('CONTRAT DE LOCATION '+this.typeLoaction, 38, 20);
    
          doc.setFontSize(11);
          doc.text('ENTRE ', 13, 40);
          doc.text('Nom :',13,48);
          doc.text('....................................',27,48);
          doc.text(this.nomPro,27,48);
          doc.text('Prenom :',68,48);
          doc.text('....................................',85,48);
          doc.text(this.prenomPro,85,48);
          doc.text('N° CIN :',130,48);
          const nCINp = this.cinPro;
          doc.text(nCINp.toString(),145,48);
          doc.text('demeuré à :',13,56);
          doc.text(this.adrPro,35,56);
          doc.text('ci-après "le Bailleur"',150,66);

          doc.text('ET ', 13, 74);
          doc.text('Nom :',13,82);
          doc.text('....................................',27,82);
          doc.text(this.nomLoc,27,82);
          doc.text('Prenom :',68,82);
          doc.text('....................................',85,82);
          doc.text(this.prenomLoc,85,82);
          doc.text('N° CIN :',130,82);
          const nCINl= this.cinLoc;
          doc.text(nCINl.toString(),145,82);
          doc.text('demeuré à :',13,90);
          doc.text(this.adrLoc,35,90);
          doc.text('ci-après "le Locataire"',150,100);

          doc.text('Il a été convenu et arrêté ce qui suit.',13,115);
          if(this.cinLoc!==null){
          doc.text(this.civPro,13,125);}
          else {doc.text('',13,125);}
          doc.text('.........................................................',25,125);
          doc.text(this.nomPro,25,125);
          doc.text(this.prenomPro,55,125);
          doc.text('donne loyer à :',90,125);

          if(this.civLoc!==null){
            doc.text(this.civLoc,118,125);
          }else{
            doc.text('',118,125); 
          }
          
          doc.text('.........................................................',127,125);
          doc.text(this.nomLoc,127,125);
          doc.text(this.prenomLoc,156,125);
          doc.text('qui accepte, pour une durée de :',13,135);
          const duree = this.duree.toString();
          doc.text(duree,70,135);
          doc.text('ferme qui commencera à courir le :',80,135);
          doc.text(this.date_entree,143,135);
          doc.text('pour prendre fin le :',13,145);
          doc.text(this.date_sortie,50,145);
          doc.text('un',75,145);
          doc.text('..................................',84,145);
          doc.text(this.typeBien,81,145);
          doc.text('sis à :',135,145);
          doc.text(this.adresseBien,13,155);
          doc.text('étage n°',13,165);
          const etage = this.etage.toString();
          doc.text(etage,30,165);
          doc.text('porte n°',35,165);
          const porte = this.porte.toString();
          doc.text(porte,50,165);
          doc.text('Equipements :',13,175);
          doc.text(this.equipements,43,175);
          doc.text('Le bailleur',26,190);
          doc.text('Signature :',13,200);
          doc.text('Le locataire',160,190);
          doc.text('Signature :',150,200);
          doc.setTextColor(100);
           // below line for Open PDF document in new tab
           doc.output('dataurlnewwindow')
           // below line for Download PDF document
           doc.save('contrat.pdf');}
           if(this.typeBien==="Parking"){
            var doc = new jsPDF();
            doc.setFontSize(18);
            doc.text('CONTRAT DE LOCATION', 70, 20);

      doc.setFontSize(11);
      doc.text('ENTRE ', 13, 40);
      doc.text('Nom :',13,48);
      doc.text('....................................',27,48);
      doc.text(this.nomPro,27,48);
      doc.text('Prenom :',68,48);
      doc.text('....................................',85,48);
      doc.text(this.prenomPro,85,48);
      doc.text('N° CIN :',130,48);
      const nCINp = this.cinPro;
      doc.text(nCINp.toString(),145,48);
      doc.text('demeuré à :',13,56);
      doc.text(this.adrPro,35,56);
      doc.text('ci-après "le Bailleur"',150,66);

      doc.text('ET ', 13, 74);
      doc.text('Nom :',13,82);
      doc.text('....................................',27,82);
      doc.text(this.nomLoc,27,82);
      doc.text('Prenom :',68,82);
      doc.text('....................................',85,82);
      doc.text(this.prenomLoc,85,82);
      doc.text('N° CIN :',130,82);
      const nCINl= this.cinLoc;
      doc.text(nCINl.toString(),145,82);
      doc.text('demeuré à :',13,90);
      doc.text(this.adrLoc,35,90);
      doc.text('ci-après "le Locataire"',150,100);

      doc.text('Il a été convenu et arrêté ce qui suit.',13,115);
      doc.text(this.civPro,13,125);
      doc.text('.........................................................',25,125);
      doc.text(this.nomPro,25,125);
      doc.text(this.prenomPro,55,125);
      doc.text('donne loyer à :',90,125);

      doc.text(this.civLoc,118,125);
      doc.text('.........................................................',127,125);
      doc.text(this.nomLoc,127,125);
      doc.text(this.prenomLoc,156,125);
      doc.text('qui accepte, pour une durée de :',13,135);
      const duree = this.duree.toString();
      doc.text(duree,70,135);
      doc.text('ferme qui commencera à courir le :',80,135);
      doc.text(this.date_entree,143,135);
      doc.text('pour prendre fin le :',13,145);
      doc.text(this.date_sortie,50,145);
      doc.text('un',75,145);
      doc.text('..................................',84,145);
      doc.text(this.typeBien,81,145);
      doc.text('sis à :',135,145);
      doc.text(this.adresseBien,13,155);
  
      doc.text('Le bailleur',26,190);
      doc.text('Signature :',13,200);
      doc.text('Le locataire',160,190);
      doc.text('Signature :',150,200);
      doc.setTextColor(100);
       // below line for Open PDF document in new tab
       doc.output('dataurlnewwindow')
       // below line for Download PDF document
       doc.save('contrat.pdf');
           }
            
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