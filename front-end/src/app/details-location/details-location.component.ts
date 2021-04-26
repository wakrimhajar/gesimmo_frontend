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
  public location: Location = new Location;
  constructor(private route: ActivatedRoute,private router: Router,private Jarwis:JarwisService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.Jarwis.getlocationbyid(this.id)
    .subscribe(data => {
      //console.log(this.user)
   data[0]=this.id;
    console.log(data[0]);
    this.location= data[0];
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
        var element = document.getElementById("CloseButton") as any;
        element.click();
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
    
    doc.text('Fiche détaillée du location', 70, 10);
    doc.setFontSize(11);
    doc.text('Date d\'entrée ', 25, 30);
    doc.text(': '+this.location.date_entree, 55, 30);
    doc.text('Date de sortie ', 25, 40);
    doc.text(': '+this.location.date_sortie, 55, 40);
    doc.text('L\'identifiant ', 25, 50);
    doc.text(': '+this.location.identifiant, 55, 50);
    doc.text('Type de location ', 120, 30);
    doc.text(': '+this.location.type, 160, 30);
    doc.text('La durée ', 120, 40);
    doc.text(': '+this.location.duree, 160, 40);
    doc.text('Montant ', 120, 50);
    doc.text(': '+this.location.montant, 160, 50);
   /* var img=new Image();
    img.src='../assets/images/loc.png';
    doc.addImage(img,'png',10,50);*/
    //doc.roundedRect();
    doc.setTextColor(100);
     // below line for Open PDF document in new tab
     doc.output('dataurlnewwindow')

     // below line for Download PDF document  
     doc.save('locataire.pdf');

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
    var element = document.getElementById("CloseButton") as any;
    element.click();
  }
}
