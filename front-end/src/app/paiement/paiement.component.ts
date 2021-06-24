import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '../Model/location';
import { JarwisService } from '../Services/jarwis.service';
import { Router } from '@angular/router';
import { Charge } from '../Model/charge';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
 
  fileName='Paiements.xlsx';
  table:boolean=false;
  t:boolean=false;
    dt:boolean=false;
    et:boolean=false;
  factures=[] as any ;
  b =[] as any ;
  f=[] as any ;
  da=[] as any ;
  etat=[] as any ;
  users = [] as any;
  biens = [] as any;
  facturesInfos=[] as any ;
  public fac : Charge[]=[];

 facture = new Charge();
 public form = {
  date_paiement:null,
  montant_paye:null,
  
  
   
}; 
selc           : any;
selc1           : any;
d           : any;
e          : any;
selectedValue : any;
message : boolean = false;

  constructor(private Jarwis:JarwisService,private router:Router) { }

  ngOnInit(): void {
    this.message = false;
    this.t = false;
    this.dt = false;
   // this.table=true;
    
   
      
      this.listLocataire();
      this.listBiens();

    
  }

  listActif(){
   /* this.Jarwis.getPaimentByMois().subscribe(
      data => {console.log(data);  this.factures=Object.values(data);}, error => console.log(error)
      );*/
      //this.table=true;

      //this.Jarwis.getPaimentByMois().subscribe(
       
        
  }
  paie(id:number){
    
    
    /*this.Jarwis.updatePaie(this.id, this.facture).subscribe(
      
      data => {console.log("clicked!");console.log(data);  this.factures=Object.values(data);}, error => console.log(error)
      );*/
      this.router.navigate(['/details-paiement', id]);

  }
  quittance(id:number){
    
    
    /*this.Jarwis.updatePaie(this.id, this.facture).subscribe(
      
      data => {console.log("clicked!");console.log(data);  this.factures=Object.values(data);}, error => console.log(error)
      );*/
      this.router.navigate(['/quittance_details', id]);

  }


  test(id:number){
    this.Jarwis.getInfos(id).subscribe(
      
      data => {console.log("clicked!");
      console.log(data);  this.factures=Object.values(data);
  },
       error => console.log(error)
      );
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

  modes(id:number){
    
    console.log("Clicked!!!!!")
    /*this.Jarwis.updatePaie(this.id, this.facture).subscribe(
      
      data => {console.log("clicked!");console.log(data);  this.factures=Object.values(data);}, error => console.log(error)
      );*/
      this.router.navigate(['/modes_paiement', id]);
      //this.router.navigate(['/details-paiement', id]);

  }

  //Nouveau 
  listBiens(){

    this.Jarwis.getBiens().subscribe(
      data => {console.log(data);  this.biens=Object.values(data);}, error => console.log(error)
      );
  }


listLocataire(){
  this.Jarwis.getLocPhyActif().subscribe(
    data => {console.log(data);  this.users=Object.values(data);}, error => console.log(error)
    );
}
s(id:any){
  this.table = false;
  this.message= true;
  this.dt = false;
  this.et = false;
  this.t = false;
  console.log("clicked!!!!!!!!!!!!!!!");
  //console.log(id);
  this.Jarwis.getPLoc(id).subscribe(
    
    data => { this.test1(data); // this.factures=Object.values(data);
},
     error => console.log(error)
    );

}
s1(id:any){
  this.table = false;
  this.t= true;
  this.dt = false;
  this.et = false;
  this.message = false;
  console.log("clicked!!!!!!!!!!!!!!!");
  //console.log(id);
  this.Jarwis.getPBien(id).subscribe(
    
    data => { this.b=Object.values(data);
      
},
     error => console.log(error)
    );


}
s2(d:any){
  this.table = false;
  this.dt= true;
  this.et = false;
  this.message = false;
  this.t = false;
  console.log(d);
    this.Jarwis.getPDate(d).subscribe(
    
    data => { console.log(data);this.da=Object.values(data);
},
     error => console.log(error)
    );



}
  s3(d:any){
  this.table = false;
  this.message = false;
  this.dt = false;
  this.t = false;
  this.et= true;
  console.log(d);
  this.Jarwis.getPEtat(d).subscribe(
    
    data => { console.log(data);this.etat=Object.values(data);
},
     error => console.log(error)
    );




}
test1(data:any){

 console.log("***********************");
 console.log(data);
 console.log("***********************");

 this.f = Object.values(data);
//this.factures=Object.values(data);
 //************************ */


}

actifsPaiement()
{
  this.Jarwis.updateImp().subscribe(
      
    data => {console.log("clicked!");
    console.log(data);  
    
   this.factures=Object.values(data);
   //console.log(this.factures);
   this.table=true;
   this.message = false;
   this.t = false;
   this.dt = false;
   this.et=false;
   //this.handleResponse(data, this.factures.id)
  }, 
    error => console.log(error)
    );
}

}
