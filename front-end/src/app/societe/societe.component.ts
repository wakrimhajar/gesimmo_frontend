import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../Model/user';
import { Router } from '@angular/router';
import { JarwisService } from '../Services/jarwis.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-societe',
  templateUrl: './societe.component.html',
  styleUrls: ['./societe.component.css']
})
export class SocieteComponent implements OnInit {
 table:boolean=false;
  user = new User();
  users=[] as any ;
  fileName='Propriétaires.xlsx';
  id:any;
  value:any;
  imagepath:any='http://127.0.0.1:8000/storage/img/';

  constructor(private Jarwis:JarwisService,private router:Router) { }

  ngOnInit(): void {

  }
  onClick(){
    var element = document.getElementById("CloseButt") as any;
    element.click();
  }
  listActif(){
    this.Jarwis.getProPhyActif().subscribe(
      data => {console.log(data);  this.users=Object.values(data);}, error => console.log(error)
      );
      this.table=true;
  }
  listArchiv(){
    this.Jarwis.getProPhyArchiv().subscribe(
      data => {console.log(data);  this.users=Object.values(data);}, error => console.log(error)
      );
      this.table=true;
  }
  detailproprietaire(id : number){

   this.Jarwis.getuserbyid(id)
    .subscribe(data => {
      //console.log(this.user)
    data[0]=id;
    //console.log(data[0]);
    this.user= data[0];
    //console.log(data)
    this.user=data;
    console.log(this.user)
    if(this.user.type==0)
    this.router.navigate(['/details-proprietaire', id]);
    else
    this.router.navigate(['/details-societe', id]);
    }, error => console.log(error));

    //this.router.navigate(['/details-proprietaire', id]);
    console.log(id);
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
