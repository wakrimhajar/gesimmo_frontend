import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../Services/jarwis.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { User } from '../Model/user';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-details-locataire',
  templateUrl: './details-locataire.component.html',
  styleUrls: ['./details-locataire.component.css']
})
export class DetailsLocataireComponent implements OnInit {
  id :any;
  public user: User = new User;
  constructor(private route: ActivatedRoute,private router: Router,private Jarwis:JarwisService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.Jarwis.getlocatairebyid(this.id)
    .subscribe(data => {
      //console.log(this.user)
   data[0]=this.id;
    console.log(data[0]);
    this.user= data[0];
    console.log(data)
    this.user=data;
    console.log(this.user)
    }, error => console.log(error));
  }

  archiver(id :number){
    this.Jarwis.archiverUser(this.id,this.user).subscribe(
      data=>{
        console.log(data)
      },error => console.log(error)
      )

      if(Object.values(this.user).length!=0)
        this.opensweetalert();
        else
        this.erreur();

        var element = document.getElementById("CloseButton") as any;
        element.click();
        this.router.navigate(['locataire'])
  }

  editer(id:number){
    console.log('clicked', id);


    this.Jarwis.getlocatairebyid(this.id)
      .subscribe(data => {
        //console.log(this.user)
      data[0]=this.id;
      console.log(data[0]);
      this.user= data[0];
      console.log(data)
      this.user=data;
      console.log(this.user)
      }, error => console.log(error));

      if(this.user.type===0)
      this.router.navigate(['edit-locataire', id])
      else
      this.router.navigate(['edit-locmor', id]);

  }

  createPdf() {
/*
    this.Jarwis.getlocatairebyid(this.id)
    .subscribe(data => {
    data[0]=this.id;
    console.log(data[0]);
    this.user= data[0];
    console.log(data)
    this.user=data;
    console.log(this.user)
    }, error => console.log(error));
    var doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Fiche détaillée du locataire', 70, 10);
    doc.setFontSize(11);
    doc.text('Civilité ', 25, 30);
    doc.text(': '+this.user.civilite, 55, 30);
    doc.text('Numéro du CIN ', 25, 40)
    doc.text(': '+this.user.CIN, 55, 40);
    doc.text('Nom ', 25, 50);
    doc.text(': '+this.user.nom, 55, 50);
    doc.text('Prénom ', 120, 30);
    doc.text(': '+this.user.prenom, 140, 30);
    doc.text('Téléphone ', 120, 40);
    doc.text(': '+this.user.telephone, 140, 40);
    doc.text('Email ', 120, 50);
    doc.text(': '+this.user.email, 140, 50);
    doc.text('Adresse ', 120, 60);
    doc.text(': '+this.user.adresse, 140, 60);
    doc.setTextColor(100);
     // below line for Open PDF document in new tab
     doc.output('dataurlnewwindow')

     // below line for Download PDF document
     doc.save('locataire.pdf');
*/
this.Jarwis.getlocatairebyid(this.id)
.subscribe(data => {
data[0]=this.id;
console.log(data[0]);
this.user= data[0];
console.log(data)
this.user=data;
console.log(this.user)
}, error => console.log(error));
var doc = new jsPDF();
doc.setFontSize(18);
doc.rect(15, 10,180,15);
doc.text('FICHE DE LOCATAIRE', 80, 20);

doc.setFontSize(11);
/*var img=new Image();
img.src='../assets/images/team-7.jpg';
doc.addImage(img, 'JPEG', 25, 30, 20, 20);*/
if(this.user.civilite==null){

}else{
  doc.text('Civilité ', 25, 60);
doc.text(': '+this.user.civilite, 55, 60);
}

doc.text('Numéro du CIN ', 25, 70)
doc.text(': '+this.user.CIN, 55, 70);
doc.text('Nom ', 25, 80);
doc.text(': '+this.user.nom, 55, 80);
doc.text('Prénom ', 25, 90);
doc.text(': '+this.user.prenom, 55, 90);
doc.text('Téléphone ', 25, 100);
doc.text(': '+this.user.telephone, 55, 100);
doc.text('Email ', 25, 110);
doc.text(': '+this.user.email, 55, 110);
doc.text('Adresse ', 25, 120);
doc.text(': '+this.user.adresse, 55, 120);

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
