import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../Services/jarwis.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Bien } from '../Model/bien';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-details-bien',
  templateUrl: './details-bien.component.html',
  styleUrls: ['./details-bien.component.css']
})
export class DetailsBienComponent implements OnInit {

  id :any;
  public bien: Bien = new Bien;
  constructor(private route: ActivatedRoute,private router: Router,private Jarwis:JarwisService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.Jarwis.getbienbyid(this.id)
    .subscribe(data => {
      //console.log(this.user)
   data[0]=this.id;
    //console.log(data[0]);
    this.bien= data[0];
    //console.log(data)
    this.bien=data;
    //console.log(this.bien)
    console.log(this.bien)
    }, error => console.log(error));

  }


  archiver(id :number){
    this.Jarwis.archiverBien(this.id,this.bien).subscribe(
      data=>{
        console.log(data)
      },error => console.log(error)
      )
        if(Object.values(this.bien).length!=0)
        this.opensweetalert();
        else
        this.erreur();
        this.router.navigate(['bien'])
        var element = document.getElementById("CloseButton") as any;
        element.click();
  }

  close(){
    var element = document.getElementById("CloseButton") as any;
    element.click();
  }

  editer(id:number){
    console.log('cliecked', id);
   this.router.navigate(['edit-bien', id])
  }
  createPdf() {
  this.Jarwis.getbienbyid(this.id)
  .subscribe(data => {
  data[0]=this.id;
  console.log(data[0]);
  this.bien= data[0];
  console.log(data)
  this.bien=data;
  console.log(this.bien)
  }, error => console.log(error));
  var doc = new jsPDF();
  doc.setFontSize(18);
  doc.rect(15, 10,180,15);
  doc.text('FICHE DE BIEN IMMOBILIER', 70, 20);
  doc.setFontSize(11);

doc.text('Identifiant', 25, 50);
doc.text(': '+this.bien.identifiant, 60, 50);
doc.text('Type de bien ', 25, 60);
doc.text(': '+this.bien.type, 60, 60);
doc.text('Code postale ', 25, 70);
doc.text(': '+this.bien.code_postal, 60, 70);
doc.text('Adresse ', 25, 80);
doc.text(': '+this.bien.adresse, 60, 80);
doc.text('Surface ', 25, 90);
doc.text(': '+this.bien.surface, 60, 90);
doc.text('Statut ', 25, 100);
doc.text(': '+this.bien.statut, 60, 100);
doc.text('N° d\'etage ', 25, 110);
doc.text(': '+this.bien.etage, 60, 110);
doc.text('N° de porte ', 25, 120);
doc.text(': '+this.bien.porte, 60, 120);
doc.text('Nombre de piece ', 25, 130);
doc.text(': '+this.bien.nbr_piece, 60, 130);
doc.text('Loyer mensuel ', 25, 140);
doc.text(': '+this.bien.loyer_mensuel, 60, 140);
doc.text('Frais syndic ', 25, 150);
doc.text(': '+this.bien.syndic, 60, 150);
doc.text('Equipements' , 25, 160);
doc.text(': '+this.bien.equipement, 60, 160);
//doc.roundedRect();
doc.setTextColor(100);
// below line for Open PDF document in new tab
doc.output('dataurlnewwindow')
// below line for Download PDF document
doc.save('bien.pdf');
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
