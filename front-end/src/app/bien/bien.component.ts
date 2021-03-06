import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bien } from '../Model/bien';
import { Router } from '@angular/router';
import { JarwisService } from '../Services/jarwis.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-bien',
  templateUrl: './bien.component.html',
  styleUrls: ['./bien.component.css']
})
export class BienComponent implements OnInit {

  table:boolean=false;
  bien = new Bien();
  biens=[] as any ;
  fileName='Biens.xlsx';
  value:any;
  constructor(private Jarwis:JarwisService,private router:Router) { }


  ngOnInit(): void {

  }
  listActif(){
    this.Jarwis.getbienActif().subscribe(
      data => {console.log(data);
         this.biens=Object.values(data);

        }
         , error => console.log(error)
      );

      this.table=true;
  }
  listArchiv(){
    this.Jarwis.getbienArchiv().subscribe(
      data => {console.log(data);  this.biens=Object.values(data);}, error => console.log(error)
      );
      this.table=true;
  }

  detailbien(id : number){

    this.router.navigate(['/details-bien', id]);
    console.log(id);

}
fonction(event :any){
  this.value=event.target.value;
  console.log(this.value);
  this.Jarwis.chercherbien(this.value)
    .subscribe(data => {
      this.biens=Object.values(data);
      console.log(this.biens);
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
