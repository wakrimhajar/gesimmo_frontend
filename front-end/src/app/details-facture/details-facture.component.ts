import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { Charge } from '../Model/charge';
import { JarwisService } from '../Services/jarwis.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'app-details-facture',
  templateUrl: './details-facture.component.html',
  styleUrls: ['./details-facture.component.css']
})
export class DetailsFactureComponent implements OnInit {

  id :any;
  x:any;
  y:any;
  total:any;
  public charge: Charge = new Charge;
  constructor(private route: ActivatedRoute,private router: Router,private Jarwis:JarwisService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.Jarwis.getchargebyid(this.id)
    .subscribe(data => {
      //console.log(this.user)
   data[0]=this.id;
    console.log(data[0]);
    this.charge= data[0];
    console.log(data)
    this.charge=data;
    ////console.log(this.charge.montant)
    this.y=this.charge.montant_total;
    console.log(this.y);
    this.x=this.y*0.2;
    console.log(this.x);
    this.total=this.y+this.x;
    }, error => console.log(error));

  }

  createPdf() {

    this.Jarwis.getchargebyid(this.id)
    .subscribe(data => {
    data[0]=this.id;
    console.log(data[0]);
    this.charge= data[0];
    console.log(data)
    this.charge=data;
    console.log(this.charge)
    }, error => console.log(error));
    var doc = new jsPDF();
    doc.setFontSize(18);
    doc.setFillColor(30,144,255);
    doc.rect(0,3,211,11,'F');
    doc.text('Facture', 11, 11);
    doc.text('HNFS', 170, 11);
    doc.setFontSize(11);
    doc.text('48 Casablanca',11,30);
    doc.text('Maroc',11,35);
    doc.text('Facturé a',11,50);
    doc.text('Wakrim Hajar',11,55);
    doc.text('48 Casablanca',11,60);
    doc.text('11200',11,65);
    doc.text('Facturé a',80,50);
    doc.text('Wakrim Hajar',80,55);
    doc.text('48 Casablanca',80,60);
    doc.text('11200',80,65);
    doc.text('Facture N° :',150,50);
    const idCharge=this.charge.id;
    doc.text(idCharge.toString(),175,50);
    doc.text('Date :',150,55);
    doc.text(this.charge.date_paiement,175,55);
    doc.text('Echeance :',150,60);
    doc.line(11,80,200,80);
    doc.setLineWidth(0.1);
    doc.text('Date',15,86);
    doc.text('Description',85,86);
    doc.text('Montant',165,86);
    doc.line(11,90,200,90);
    doc.setLineWidth(0.1);
    doc.text(this.charge.date_paiement,15,96);
    doc.text(this.charge.description,85,96);
    const montant = this.charge.montant_total;
    doc.text(montant.toString(),165,96);
    doc.line(11,100,200,100);
    doc.setLineWidth(0.1);
    const mntTVA = this.charge.montant_total*0.2;

    doc.text('TVA ',85,106);
    doc.text((montant+mntTVA).toString(),165,116);
    doc.text(mntTVA.toString(),165,106);
    doc.line(85,110,200,110);
    doc.setLineWidth(0.1);
    doc.text('Total',85,116);
    doc.line(85,120,200,120);
    doc.setLineWidth(0.1);
    doc.text('Condition et modalité de paiement :',11,160);
    doc.text('Le paiement est du le :',11,165);
    doc.text(this.charge.date_paiement,52,165);
    doc.text('48 Casablanca',11,170);
    doc.text('11200',11,175);
    doc.setFontSize(11);
    doc.setTextColor(100);

     // below line for Open PDF document in new tab
     doc.output('dataurlnewwindow')

     // below line for Download PDF document
     doc.save('facture.pdf');
    /* var doc = new jsPDF();
     doc.setFontSize(18);
     //doc.rect(15, 10,180,15);
     doc.text('QUITTANCE DE LOYER', 70, 20);
     doc.setFontSize(11);
     doc.text('Madame / Monsieur ',11,40);

      // below line for Open PDF document in new tab
      doc.output('dataurlnewwindow')
      // below line for Download PDF document
      doc.save('quittance.pdf');*/

  }
  opensweetalert(){
    Swal.fire({
      title: 'Succés',
      text: 'Archiver avec succes!',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'OK!',
      cancelButtonText: 'No, keep it'
    })
   }

   erreur(){
    Swal.fire({
      title: 'Ereur',
      text: 'Erreur!',
      icon: 'error',
      showCancelButton: false,
      confirmButtonText: 'OK!',
      cancelButtonText: 'No, keep it'
    })
   }








}
