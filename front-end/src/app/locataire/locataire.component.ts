import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../Model/user';
import { Router } from '@angular/router';
import { JarwisService } from '../Services/jarwis.service';
import { AppState } from '../Ngrx/store/state';
import { State, Store } from '@ngrx/store';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-locataire',
  templateUrl: './locataire.component.html',
  styleUrls: ['./locataire.component.css']
})
export class LocataireComponent implements OnInit {
  table:boolean=false;
  user = new User();
  users=[] as any ;
  fileName='Locataires.xlsx';
  value:any;
  constructor(private Jarwis:JarwisService,private router:Router,private store: Store<AppState>) { }
 
  ngOnInit(): void {


  }
  onClick(){
    var element = document.getElementById("CloseButton1") as any;
    element.click();
  }
  listActif(){
    this.Jarwis.getLocPhyActif().subscribe(
      data => {console.log(data);  this.users=Object.values(data);}, error => console.log(error)
      );
      this.table=true;
  }
  listArchiv(){
    this.Jarwis.getLocPhyArchiv().subscribe(
      data => {console.log(data);  this.users=Object.values(data);}, error => console.log(error)
      );
      this.table=true;
  }

  detaillocataire(id : number){

    this.Jarwis.getlocatairebyid(id)
    .subscribe(data => {
      //console.log(this.user)
    data[0]=id;
    console.log(data[0]);
    this.user= data[0];
    console.log(data)
    this.user=data;
    console.log(this.user)
    if(this.user.type===0)
    this.router.navigate(['/details-locataire', id]);
    else
    this.router.navigate(['/details-locmor', id]);
    }, error => console.log(error));



      //this.router.navigate(['/details-locataire', id]);
      //console.log(id);
  }

  fonction(event :any){
    this.value=event.target.value;
    console.log(this.value);
    this.Jarwis.chercher(this.value)
      .subscribe(data => {
        this.users=Object.values(data);
        console.log(this.users);
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
