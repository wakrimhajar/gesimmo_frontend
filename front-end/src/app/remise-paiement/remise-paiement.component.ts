import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Charge } from '../Model/charge';
import { JarwisService } from '../Services/jarwis.service';
import {NgForm} from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { Bien } from '../Model/bien';
import { User } from '../Model/user';
import { Mode } from '../Model/mode';
import { Location } from '../Model/location';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-remise-paiement',
  templateUrl: './remise-paiement.component.html',
  styleUrls: ['./remise-paiement.component.css']
})
export class RemisePaiementComponent implements OnInit {
  public facture : Charge=new Charge;
  public locataire : User=new User;
  public bien : Bien=new Bien;
  public proprietaire : User=new User;
  public factures : Charge[]=[];
  public mode : Mode=new Mode;
  public location : Location=new Location;
  test : any;
  id: any;
  a:any;
  total: number = 0
  input1: number = 0
  input2: number = 0
  message: boolean =true;

  constructor(private route: ActivatedRoute,private router: Router,private Jarwis: JarwisService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.Jarwis.getMode(this.id)
    .subscribe(data => {
      //console.log(data);
     this.test1(data);
    
    
    // data[0]=this.id;
   // console.log(data[0]);

   // console.log(data)
    //this.facture=data;
   // console.log(this.facture)
    }, error => console.log(error));
   

  }
  onSubmitform(){
    this.alertConfirm();
    
  }
  addPaiement(){
    this.Jarwis.updateMP(this.id, this.mode).subscribe(
      
      data => {console.log("clicked!");console.log(data); this.alert();this.back();

    }, error => console.log(error)
      );

  }

  updateM(){
    console.log(this.mode.id)
    /*this.Jarwis.updateMP(this.mode.id, this.mode).subscribe(
      
      data => {console.log("clicked!");console.log(data); //this.alert(); this.back();

    }, error => console.log(error)
      );*/

  }

  updateFac(){
    this.Jarwis.updatePaie(this.id, this.facture).subscribe(
      
      data => {console.log("clicked!");console.log(data); this.alert(); this.back();

    }, error => console.log(error)
      );
  }

  test1(data:any){
    this.mode = data;
   
   // this.mode = null;
  // console.log(data["location"].id);

  }
 
 
  alert(){
    Swal.fire({
      title: 'paiement ',
      width: 500,
      text: 'Paiement effectué avec succés   ',
      icon: 'success',
      showCancelButton: false,
      
      confirmButtonText: 'ok',
      cancelButtonText: 'No, keep it'
    })
  }
  alertConfirm(){
    Swal.fire({  
      title: 'Etes vous sur de vouloir valider la modification de  ce paiement?',  
      text: 'Une fois ce paiement est validé, vous ne pouvez plus le modifier!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'valider',  
      cancelButtonText: 'annuler'  
    }).then((result) => {  
      if (result.value) {  
        this.addPaiement();
        //this.updateM();
      } /*else if (result.dismiss === Swal.DismissReason.cancel) {  
        Swal.fire(  
          'Annulé!',  
          'Paiement non enregistré',  
          'error'  
        )  
      }  */
    })  
  }
  back(){
    this.router.navigateByUrl('/paiement');
  }
  alertError(){
    Swal.fire(  
      'Attention!',  
      'Le montant que vous avez saisi ne correspond pas au montant total de cette location, merci de saisir le montant exact',  
      'error'  
    )  

  }


}
