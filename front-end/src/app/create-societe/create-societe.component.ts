import { Component, OnInit } from '@angular/core';
import { document } from '../Model/document.model';
import { User } from '../Model/user';
import { Router } from '@angular/router';
import { JarwisService } from '../Services/jarwis.service';
import { TokenService } from '../Services/token.service';
import Swal from 'sweetalert2' ;
@Component({
  selector: 'app-create-societe',
  templateUrl: './create-societe.component.html',
  styleUrls: ['./create-societe.component.css']
})
export class CreateSocieteComponent implements OnInit {
  dataarray=[] as any;
  document = new document();
  constructor(private Jarwis:JarwisService,private router:Router,private Token:TokenService) { }
   user = new User();

  ngOnInit(): void {
  }
  addForm(){
    this.document= new document();
    this.dataarray.push(this.document);
  }
  filedata:any;
   fileEvent(e:any){
    this.filedata = e.target.files[0];}
  onSubmit(){
      var myFormData = new FormData();
      //myFormData.append('doc', this.event);
      myFormData.append('image', this.filedata);
      myFormData.append('nom',this.user.nom);
      myFormData.append('prenom',this.user.prenom);
      myFormData.append('CIN',this.user.CIN);
      myFormData.append('password',this.user.password);
      myFormData.append('email',this.user.email);
      myFormData.append('nom_societe',this.user.nom_societe);
      myFormData.append('patente',this.user.patente);
      myFormData.append('telephone',this.user.telephone);
      myFormData.append('RC',this.user.RC);
      myFormData.append('statut_societe',this.user.statut_societe);
      myFormData.append('document',this.dataarray);
    console.log(this.dataarray);
    this.Jarwis.addsociete(myFormData).subscribe(

      data => console.log(data), error => console.log(error)
      );
    this.user = new User();
    this.router.navigate(['/societe']);
   }

   opensweetalert(){
    Swal.fire({
      title: 'Succés',
      text: 'Ajout avec succes!',
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
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'OK!',
      cancelButtonText: 'No, keep it'
    })
   }

  alert(){
     if(Object.values(this.user).length!=0)
      this.opensweetalert();
    else
    this.erreur();
   }
}
