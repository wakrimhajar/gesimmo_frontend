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
  table:boolean=true;
  factures=[] as any ;
  facturesInfos=[] as any ;
  fileName='Paiements.xlsx';
 facture = new Charge();
 public form = {
  date_paiement:null,
  montant_paye:null,
   
}; 
message : boolean = false;
  constructor(private Jarwis:JarwisService,private router:Router) { }

  ngOnInit(): void {
    this.message = false;
    
    this.Jarwis.updateImp().subscribe(
      
      data => {console.log("clicked!");
      console.log(data);  
      
     this.factures=Object.values(data);
     //console.log(this.factures);

     
     //this.handleResponse(data, this.factures.id)
    }, 
      error => console.log(error)
      );
      this.table=true;

    
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

}
