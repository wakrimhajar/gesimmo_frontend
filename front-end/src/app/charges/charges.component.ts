import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Charge } from '../Model/charge';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { JarwisService } from '../Services/jarwis.service';
@Component({
  selector: 'app-charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.css']
})
export class ChargesComponent implements OnInit {
  table:boolean=false;
  charge = new Charge();
  charges=[] as any ;
  fileName='Charges.xlsx';
  value:any;
  constructor(private Jarwis:JarwisService,private router:Router) { }

  ngOnInit(): void {
  }

  listActif(){
    this.Jarwis.getchargeActif().subscribe(
      data => {console.log(data);  this.charges=Object.values(data);}, error => console.log(error)
      );
      this.table=true;
  }

  detailfacture(id:number){
    this.router.navigate(['/details-facture',id]);
    console.log(id);
  }
  fonction(event :any){
    this.value=event.target.value;
    console.log(this.value);
    this.Jarwis.chercherccharge(this.value)
      .subscribe(data => {
        this.charges=Object.values(data);
        console.log(this.charges);
        this.table=true;
      },error=>console.log(error));
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
}
