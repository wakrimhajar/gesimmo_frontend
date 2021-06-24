import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '../Model/location';
import { JarwisService } from '../Services/jarwis.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  table:boolean=false;
  location = new Location();
  locations=[] as any ;
  fileName='Locations.xlsx';
  value:any;
  constructor(private Jarwis:JarwisService,private router:Router) { }

  ngOnInit(): void {
  }

  fonction(event :any){
    this.value=event.target.value;
    console.log(this.value);
    this.Jarwis.chercherLoc(this.value)
      .subscribe(data => {
        this.locations=Object.values(data);
        console.log(this.locations);
        this.table=true;
      },error=>console.log(error));
   }

  listActif(){
    this.Jarwis.getlocationActif().subscribe(
      data => {console.log(data);  
        this.locations=Object.values(data);},
         error => console.log(error)
      );
      this.table=true;
  }
  listArchiv(){
    this.Jarwis.getlocationArchiv().subscribe(
      data => {console.log(data);  this.locations=Object.values(data);}, error => console.log(error)
      );
      this.table=true;
  }
  detaillocation(id : number){

    this.router.navigate(['/details-location', id]);
    console.log(id);

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
