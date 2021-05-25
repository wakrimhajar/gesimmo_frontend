import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Charge } from '../Model/charge';
import { JarwisService } from '../Services/jarwis.service';
import {NgForm} from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { Bien } from '../Model/bien';
import { User } from '../Model/user';
import { NgModule } from '@angular/core';
import jsPDF from 'jspdf';







@Component({
  selector: 'app-quittance-paiement',
  templateUrl: './quittance-paiement.component.html',
  styleUrls: ['./quittance-paiement.component.css']
})
export class QuittancePaiementComponent implements OnInit {

  public facture : Charge=new Charge;
  public locataire : User=new User;
  public bien : Bien=new Bien;
  public proprietaire : User=new User;
  public factures : Charge[]=[];
  test : any;
  id: any;
  a:any;
  total: number = 0
  input1: number = 0
  input2: number = 0
  message: boolean =true;
  

  //constructor(private route: ActivatedRoute,private router: Router,  private pdfTable: ElementRef, private Jarwis: JarwisService) { }
  constructor(private route: ActivatedRoute,private router: Router,   private Jarwis: JarwisService) { }




  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.Jarwis.getInfos(this.id)
    .subscribe(data => {
      console.log(data);
     this.test1(data);
    
    // data[0]=this.id;
   // console.log(data[0]);

   // console.log(data)
    //this.facture=data;
   // console.log(this.facture)
    }, error => console.log(error));
   

  }
  

 

  test1(data:any){
    this.facture = data;
    this.bien = data["location"]["bien"];
    this.proprietaire = data["location"]["bien"]["user"];
    this.locataire = data["location"]["user"];
   console.log(data["location"].id);

  }
 
 

 
  back(){
    this.router.navigateByUrl('/paiement');
  }

    public downloadAsPDF() {
   
   console.log("yes ");
     var doc = new jsPDF();
       doc.setFontSize(18);
       doc.text('HNFS', 95, 25);
       doc.text('Quittance de loyer', 85, 35);
       doc.setFontSize(11);
       doc.text('Quittance émise le ',141,55);
       doc.text(this.facture.date_paiement,175,55);
       doc.text('Bailleur : ',20,62);
       doc.text(this.proprietaire.civilite,20,70);
       doc.text(this.proprietaire.nom,30,70);
       doc.text(this.proprietaire.prenom,44,70);
       doc.text(this.proprietaire.adresse,20,78);
       doc.text('Locataire :',150,88);
       doc.text(this.locataire.civilite,150,96);
       doc.text(this.locataire.nom,160,96);
       doc.text(this.locataire.prenom,182,96);
       doc.text(this.locataire.adresse,150,104);
       doc.text('Quittance de loyer', 85, 114);
   
       doc.line(20,118,200,118);
       doc.setLineWidth(0.1);
       doc.text('Description',45,123);
       doc.text('Montant',135,123);
       doc.line(20,128,200,128);
       doc.setLineWidth(0.1);
       doc.text('Adresse du bien ',30,135);
       doc.text(this.bien.adresse,120,135);
     
       doc.line(20,138,200,138);
       doc.setLineWidth(0.1);
   
       doc.text('Loyer mensuel ',30,145);
       doc.text(this.bien.loyer_mensuel.toString(),120,145);
       doc.text(('DH'),130,145);
     
       doc.line(20,148,200,148);
       doc.setLineWidth(0.1);
   
       doc.text('Syndic ',30,155);
       doc.text(this.bien.syndic.toString(),120,155);
       doc.text(('DH'),130,155);
     
       doc.line(20,158,200,158);
       doc.setLineWidth(0.1);
   
       doc.text('Pour le mois  ',30,165);
       doc.text(this.facture.mois_paiement,120,165);
     
       doc.line(20,168,200,168);
       doc.setLineWidth(0.1);
       
       doc.text('Montant total  ',30,175);
       doc.text(this.facture.montant_total,120,175);
       doc.text(('DH'),130,145);
     
       doc.line(20,178,200,178);
       doc.setLineWidth(0.1);
       
       doc.line(100,118,100,178);
       doc.setLineWidth(0.1);
       doc.line(20,118,20,178);
       doc.setLineWidth(0.1);
       doc.line(200,118,200,178);
       doc.setLineWidth(0.1);
    
        doc.text('Cette quittance annule tous les reçus qui auraient pu être établis précédemment en cas de paiement partiel',20,188);
        doc.text(' du montant du présent terme. Elle est à conserver pendant trois ans par le locataire (article 7-1 de la loi n° 89-462 du 6 juillet 1989).',20,198)
        doc.text(' 89-462 du 6 juillet 1989).',20,208)
  
       doc.setFontSize(11);
       doc.setTextColor(100);
           doc.output('dataurlnewwindow')
   
        doc.save('quittance.pdf');
        
        
     }


}
