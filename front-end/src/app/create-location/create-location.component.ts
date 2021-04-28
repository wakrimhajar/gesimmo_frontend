import { Component, OnInit } from '@angular/core';
import { Location } from '../Model/location';
import { Router } from '@angular/router';
import { Bien } from '../Model/bien';
import { User } from '../Model/user';
import { JarwisService } from '../Services/jarwis.service';
import { TokenService } from '../Services/token.service';
import Swal from 'sweetalert2' ;
@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.css']
})
export class CreateLocationComponent implements OnInit {

  constructor(private Jarwis:JarwisService,private router:Router,private Token:TokenService) { }
  location = new Location();
  bien = new Bien();
  biens=[] as any ;
  user = new User();
  users=[] as any ;
  ngOnInit(): void {
    this.listLocataire();
    this.listActif();
  }

  onSubmit(){
    this.Jarwis.addlocation(this.location).subscribe(
      data => console.log(data), error => console.log(error)
      );
    this.location = new Location();
   }

   listActif(){
    this.Jarwis.getbienLibre().subscribe(
      data => {console.log(data);  this.biens=Object.values(data);}, error => console.log(error)
      );

  }
  listLocataire(){
    this.Jarwis.getLocPhyActif().subscribe(
      data => {console.log(data);  this.users=Object.values(data);}, error => console.log(error)
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
     if(Object.values(this.location).length!=0)
      this.opensweetalert();
    else
     this.erreur();
   }


}
