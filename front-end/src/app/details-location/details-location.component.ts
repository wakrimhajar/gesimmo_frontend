import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../Services/jarwis.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '../Model/location';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-details-location',
  templateUrl: './details-location.component.html',
  styleUrls: ['./details-location.component.css']
})
export class DetailsLocationComponent implements OnInit {

  id :any;
   location=[] as any;
  constructor(private route: ActivatedRoute,private router: Router,private Jarwis:JarwisService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.Jarwis.getlocationbyid(this.id)
    .subscribe(data => {
      //console.log(this.user)
   data[0]=this.id;
    console.log(data[0]);
    console.log(data['user']);
    this.location= data;
    console.log(data)
    this.location=data;
    console.log(this.location)
    }, error => console.log(error));
  }

  archiver(id :number){
    this.Jarwis.archiverLocation(this.id,this.location).subscribe(
      data=>{
        console.log(data)
      },error => console.log(error)
      )
       if(Object.values(this.location).length!=0)
        this.opensweetalert();
        else
        this.erreur();
        var element = document.getElementById("CloseButtonArc") as any;
        element.click();
        this.router.navigate(['location'])
  }

  editer(id:number){
    console.log('cliecked', id);
   this.router.navigate(['edit-location', id])
  }

  createPdf() {

    this.Jarwis.getlocationbyid(this.id)
    .subscribe(data => {
    data[0]=this.id;
    console.log(data[0]);
    this.location= data[0];
    console.log(data)
    this.location=data;
    console.log(this.location)
    }, error => console.log(error));
    var doc = new jsPDF();
    doc.setFontSize(18);
    doc.setFontSize(18);
    doc.rect(15, 10,180,15);
    doc.text('FICHE DE LOCATION', 80, 20);
    doc.setFontSize(11);
    doc.text('L\'identifiant ', 25, 50);
    doc.text(': '+this.location.identifiant, 55, 50);
    doc.text('Date d\'entrée ', 25, 60);
    doc.text(': '+this.location.date_entree, 55, 60);
    doc.text('Date de sortie ', 25, 70);
    doc.text(': '+this.location.date_sortie, 55, 70);
    doc.text('Type de location ', 25, 80);
    doc.text(': '+this.location.type, 55, 80);
    doc.text('La durée ', 25, 90);
    doc.text(': '+this.location.duree, 55, 90);
    /*doc.text('Montant ', 25, 100);
    doc.text(': '+this.location.montant, 55, 100);*/
    doc.setTextColor(100);
     // below line for Open PDF document in new tab
     doc.output('dataurlnewwindow')
     // below line for Download PDF document
     doc.save('location.pdf');

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


   close(){
    var element = document.getElementById("CloseButtonArc") as any;
    element.click();
  }
}
