import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../Services/jarwis.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { User } from '../Model/user';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-details-proprietaire',
  templateUrl: './details-proprietaire.component.html',
  styleUrls: ['./details-proprietaire.component.css']
})
export class DetailsProprietaireComponent implements OnInit {
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

    /*exportAsPDF()
    {
      var data = document.getElementById('pdf');
      html2canvas(data as any).then(canvas => {
        console.log(canvas);
        const contentDataURL = canvas.toDataURL('image/png')
        var imgHeight = canvas.height * 202 / canvas.width;
        console.log(imgHeight);
        let pdf = new jspdf('p', 'mm', 'a4'); //Generates PDF in landscape mode
        // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
        pdf.addImage(contentDataURL, 'PNG', 0, 0,202,imgHeight);
        pdf.save('proprietaire.pdf');
      });
    }*/
    createPdf() {

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
     /* var img=new Image();
      img.src='../assets/images/loc.png';
      doc.addImage(img,'png',10,50);*/
      //doc.roundedRect();
      doc.setTextColor(100);
       // below line for Open PDF document in new tab
       doc.output('dataurlnewwindow')
  
       // below line for Download PDF document  
       doc.save('propriétaire.pdf');
  
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


