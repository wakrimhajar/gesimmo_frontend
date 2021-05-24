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
    /*console.log("yes ");
    const doc = new jsPDF();*/


    var doc = new jsPDF();
    doc.setFontSize(18);
    doc.setFillColor(30,144,255);
    doc.text('HNFS',95, 15);
    doc.setFontSize(16);
    doc.text('Loyer de quittance', 80, 25);
    doc.setFontSize(11);
    doc.text('Bailleur :',13,35);
    doc.text(this.proprietaire.civilite,13,45);
    doc.text(this.proprietaire.nom,23,45);
    
   
    doc.setFontSize(11);
    doc.setTextColor(100);

     // below line for Open PDF document in new tab
     doc.output('dataurlnewwindow')

     // below line for Download PDF document
    // doc.save('quittance.pdf');

   
   // const pdfTable = this.pdfTable.nativeElement;
   
    //var html = htmlToPdfmake(pdfTable.innerHTML);
   /* var html = htmlToPdfmake(`
    <div>
      <h1>My title</h1>
      <p>
        This is a sentence with a <strong>bold word</strong>, <em>one in italic</em>,
        and <u>one with underline</u>. And finally <a href="https://www.facebook.com">a link</a>.
      </p>
    </div>
  `);*/
    //var html = htmlToPdfmake(document.getElementById("myP").innerHTML);
     
    //const documentDefinition = { content: html };
   // pdfMake.createPdf(documentDefinition).open(); 
     
  }


}
