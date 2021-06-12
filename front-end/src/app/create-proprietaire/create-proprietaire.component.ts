import { Component, OnInit } from '@angular/core';
import { document } from '../Model/document.model';
import { User } from '../Model/user';
import { Router } from '@angular/router';

import { JarwisService } from '../Services/jarwis.service';
import { TokenService } from '../Services/token.service';


import {NgForm} from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-create-proprietaire',
  templateUrl: './create-proprietaire.component.html',
  styleUrls: ['./create-proprietaire.component.css']
})
export class CreateProprietaireComponent implements OnInit {
  dataarray=[] as any;
  document = new document();

  constructor(private http: HttpClient, private Jarwis:JarwisService,private router:Router,private Token:TokenService) { }
   user = new User();

  ngOnInit(): void {
  }
  addForm(){
    this.document= new document();
    this.dataarray.push(this.document);

  }
  event:any
  Event(e:any){
  this.event=e.target.files[0];
  console.log(this.event);
  }

   filedata:any;
   fileEvent(e:any){
    this.filedata = e.target.files[0];
    console.log(this.filedata);

   }

    onSubmitform(f: NgForm) {
      var myFormData = new FormData();
      myFormData.append('doc', this.event);
      myFormData.append('nomdoc',this.document.nomdoc);
      myFormData.append('image', this.filedata);
      myFormData.append('nom',this.user.nom);
      myFormData.append('prenom',this.user.prenom);
      myFormData.append('CIN',this.user.CIN);
      myFormData.append('password',this.user.password);
      myFormData.append('email',this.user.email);
      myFormData.append('civilite',this.user.civilite);
      myFormData.append('telephone',this.user.telephone);
      myFormData.append('adresse',this.user.adresse);
      myFormData.append('document',this.dataarray);
    console.log(this.dataarray);
      //myFormData.append('documents',JSON.stringify(this.dataarray));
      this.Jarwis.addpropriétaire(myFormData).subscribe(

        myFormData => console.log(myFormData), 
        error => console.log(error)
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
      icon: 'error',
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




