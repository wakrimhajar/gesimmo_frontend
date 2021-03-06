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
import * as XLSX from 'xlsx';
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
  fileName='Historique_Paiements.xlsx';
//  test : any;
  id: any;
 // a:any;
  total: any;
  test : any;
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

  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }
  remise(id:any){
    this.router.navigate(['/r_paiement', id]);
    
   
   
     }
     ann(id:any){
      this.test=id;
      console.log("clicked!!");
      this.alertConfirm();
      
      
     
     
       }
     updateM(){
      console.log(this.test);
      this.Jarwis.annuler(this.test, this.mode).subscribe(
      
        data => {console.log("clicked!");console.log(data); this.alert(); this.back();
  
      }, error => console.log(error)
        );
    }
    alert(){
      Swal.fire({
        title: 'paiement ',
        width: 500,
        text: 'Paiement annul?? avec succ??s   ',
        icon: 'success',
        showCancelButton: false,
        
        confirmButtonText: 'ok',
        cancelButtonText: 'No, keep it'
      })
    }
    back(){
      this.router.navigateByUrl('/paiement');
    }
     alertConfirm(){
      Swal.fire({  
        title: 'Etes vous sur de vouloir annuler ce paiement?',  
        text: "L'annulation de ce paiement entraine se ",  
        icon: 'warning',  
        showCancelButton: true,  
        confirmButtonText: 'valider',  
        cancelButtonText: 'annuler'  
      }).then((result) => {  
        if (result.value) {  
          this.updateM();
          //this.updateM();
        } /*else if (result.dismiss === Swal.DismissReason.cancel) {  
          Swal.fire(  
            'Annul??!',  
            'Paiement non enregistr??',  
            'error'  
          )  
        }  */
      })  
    }

}
