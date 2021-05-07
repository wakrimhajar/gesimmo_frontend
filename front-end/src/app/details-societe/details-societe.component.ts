import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../Services/jarwis.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { User } from '../Model/user';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-details-societe',
  templateUrl: './details-societe.component.html',
  styleUrls: ['./details-societe.component.css']
})
export class DetailsSocieteComponent implements OnInit {
  id :any;
  public user: User = new User;
  notification :any;
  x:any;
  constructor(private route: ActivatedRoute,private router: Router,private Jarwis:JarwisService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.Jarwis.getuserbyid(this.id)
    .subscribe(data => {
      //console.log(this.user)
   data[0]=this.id;
    console.log(data[0]);
    this.user= data[0];
    //console.log(data)
    this.user=data;
    //console.log(this.user)
    }, error => console.log(error));

    this.Jarwis.getnotification(this.id)
    .subscribe(data => {
        console.log(data['data']);
    //this.notification=data['data'];
    //JSON.stringify(data['data']);
    //this.x=JSON.stringify(this.notification);
    //console.log(this.notification);
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
        this.router.navigate(['societe']);
    }
    editer(id:number){
      console.log('cliecked', id);

      this.Jarwis.getuserbyid(this.id)
      .subscribe(data => {
        //console.log(this.user)
      data[0]=this.id;
      console.log(data[0]);
      this.user= data[0];
      //console.log(data)
      this.user=data;
      console.log(this.user)
      }, error => console.log(error));

      if(this.user.type===0)
        this.router.navigate(['edit-p', id]);
      else
      this.router.navigate(['edit-morale', id]);
    }

    createPdf() {

      this.Jarwis.getuserbyid(this.id)
      .subscribe(data => {
        //console.log(this.user)
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
      doc.text('FICHE TECHNIQUE', 80, 20);

      var img=new Image();
img.src='../assets/images/ISGA.png';
doc.addImage(img, 'png', 25, 30, 20, 20);
doc.setFontSize(11);
doc.text('Nom du société ', 25, 60);
doc.text(': '+this.user.nom_societe, 75, 60);
doc.text('Statut ', 25, 70);
doc.text(': '+this.user.statut_societe, 75, 70);
doc.text('Patente ', 25, 80);
doc.text(': '+this.user.patente, 75, 80);
doc.text('Registre de commerce ', 25, 90);
doc.text(': '+this.user.RC, 75, 90);
doc.text('N° CIN du responsable ', 25, 100);
doc.text(': '+this.user.CIN, 75, 100);
doc.text('Nom de responsable ', 25, 110);
doc.text(': '+this.user.nom, 75, 110);
doc.text('Prénom de responsable', 25, 120);
doc.text(': '+this.user.prenom, 75, 120);
doc.text('Téléphone ', 25, 130);
doc.text(': '+this.user.telephone, 75, 130);
doc.text('Email ', 25, 140);
doc.text(': '+this.user.email, 75, 140);
doc.text('Adresse ', 25, 150);
doc.text(': '+this.user.adresse, 75, 150);
doc.setTextColor(100);
 // below line for Open PDF document in new tab
 doc.output('dataurlnewwindow')
 // below line for Download PDF document
 doc.save('société.pdf');
     /* doc.text('Nom du société ', 11, 40);
      doc.text(': '+this.user.nom_societe, 60, 40);
      doc.text('Numéro du CIN ',11, 50);
      doc.text(': '+this.user.CIN, 60, 50);
      doc.text('Nom ', 11, 60);
      doc.text(': '+this.user.nom, 60, 60);
      doc.text('Prénom ', 11, 70);
      doc.text(': '+this.user.prenom, 60, 70);
      doc.text('Téléphone ', 11, 80);
      doc.text(': '+this.user.telephone, 60, 80);
      doc.text('Email ', 11, 90);
      doc.text(': '+this.user.email, 60, 90);
      doc.text('Adresse ', 11, 100);
      doc.text(': '+this.user.adresse, 60, 100);
      doc.text('Statut ', 11, 110);
      doc.text(': '+this.user.statut_societe, 60, 110);
      doc.text('Patente ', 11, 120);
      doc.text(': '+this.user.patente, 60, 120);
      doc.text('Registre de commerce ', 11, 130);
      doc.text(': '+this.user.RC, 60, 130);
      doc.setTextColor(100);
       // below line for Open PDF document in new tab
       doc.output('dataurlnewwindow')

       // below line for Download PDF document
       doc.save('société.pdf');*/

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
detailsociete(id : number){

  this.Jarwis.getuserbyid(id)
   .subscribe(data => {
     //console.log(this.user)
   data[0]=id;
   //console.log(data[0]);
   this.user= data[0];
   //console.log(data)
   this.user=data;
   console.log(this.user)
   this.router.navigate(['/bien_user', id]);
   }, error => console.log(error));
   console.log(id);
 }

}
