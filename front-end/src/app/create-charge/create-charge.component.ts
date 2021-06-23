import { Component, OnInit } from '@angular/core';
import { Charge } from '../Model/charge';
import { Router } from '@angular/router';
import { JarwisService } from '../Services/jarwis.service';
import { TokenService } from '../Services/token.service';
import Swal from 'sweetalert2' ;
import { Bien } from '../Model/bien';
@Component({
  selector: 'app-create-charge',
  templateUrl: './create-charge.component.html',
  styleUrls: ['./create-charge.component.css']
})
export class CreateChargeComponent implements OnInit {

  constructor(private Jarwis:JarwisService,private router:Router,private Token:TokenService) { }
charge=new Charge;
bien = new Bien();
biens = [] as any;
  ngOnInit(): void {
    this.Jarwis.getBiens().subscribe(
      data => { console.log(data); this.biens = Object.values(data); }, error => console.log(error)
  );
  }

  onSubmit(){
    this.Jarwis.addcharge(this.charge).subscribe(
      data => console.log(data), error => console.log(error)
      );
    this.charge = new Charge();
    this.router.navigate(['/charges']);
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
   listActif() {
    this.Jarwis.getbienLibre().subscribe(
        data => { console.log(data); this.biens = Object.values(data); }, error => console.log(error)
    );

}
}
