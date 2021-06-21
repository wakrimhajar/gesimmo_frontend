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
  selector: 'app-mode-paiement',
  templateUrl: './mode-paiement.component.html',
  styleUrls: ['./mode-paiement.component.css']
})
export class ModePaiementComponent implements OnInit {
  public facture : Charge=new Charge;
  public locataire : User=new User;
  public bien : Bien=new Bien;
  public proprietaire : User=new User;
  modes=[] as any ;
  public factures : Charge[]=[];
  public mode : Mode=new Mode;
  public location : Location=new Location;
  public error=null;
//  test : any;
  id: any;
 // a:any;
  total: any;
 /* input1: number = 0
  input2: number = 0
  message: boolean =true;*/
  

  constructor(private route: ActivatedRoute,private router: Router,private Jarwis: JarwisService) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    console.log(this.id)
    this.Jarwis.getModes(this.id)
    .subscribe(data => {
      this.modes=Object.values(data);
   
    }, error => this.handleError(error));
    this.Jarwis.getInfos(this.id)
    .subscribe(data => {
      console.log(data);
     this.test1(data);
     
 
    }, error => console.log(error));
    this.somme(this.id);
  
    //this.total = this.somme(this.id)
   

  }
  onSubmitform(){
   // this.alertConfirm();
    
  }
  somme(id:any){
    this.Jarwis.getSomme(this.id)
    .subscribe(data => {
      console.log("***************");
      console.log(data);
      this.total = data;
 
    }, error => console.log(error));
    
    
  }
  test1(data:any){
    this.facture = data;
    this.bien = data["location"]["bien"];
    this.proprietaire = data["location"]["bien"]["user"];
    this.locataire = data["location"]["user"];
    this.location = data["location"];

  }

  handleError(error:any){
    this.error = error.error.error;
  }

}
