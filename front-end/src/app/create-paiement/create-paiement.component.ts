import { Component, OnInit } from '@angular/core';
import { Charge } from '../Model/charge';
import { Router } from '@angular/router';
import { JarwisService } from '../Services/jarwis.service';
import { TokenService } from '../Services/token.service';
import { Location } from '../Model/location';
import Swal from 'sweetalert2' ;
@Component({
  selector: 'app-create-paiement',
  templateUrl: './create-paiement.component.html',
  styleUrls: ['./create-paiement.component.css']
})
export class CreatePaiementComponent implements OnInit {
  location = new Location();
  locations=[] as any ;
  constructor(private Jarwis:JarwisService,private router:Router,private Token:TokenService) { }
charge=new Charge;
  ngOnInit(): void {
    this.listActif();
  }

  onSubmit(){
    this.Jarwis.addpaiement(this.charge).subscribe(
      data => console.log(data), error => console.log(error)
      );
    this.charge = new Charge();
   }
   listActif(){
    this.Jarwis.getlocationActif().subscribe(
      data => {console.log(data);  this.locations=Object.values(data);}, error => console.log(error)
      );
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
     if(Object.values(this.charge).length!=0)
      this.opensweetalert();
    else
    this.erreur();
   }
}
