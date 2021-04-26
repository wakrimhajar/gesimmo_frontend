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
  constructor(private route: ActivatedRoute,private router: Router,private Jarwis:JarwisService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
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
      var doc = new jsPDF();
     const CIN = this.user.CIN;
      doc.setFontSize(18);
      doc.text('Fiche détaillée du société', 70, 20);
      doc.setFontSize(11);
      doc.text('Nom du société ', 11, 40);
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
       doc.save('société.pdf');
  
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
