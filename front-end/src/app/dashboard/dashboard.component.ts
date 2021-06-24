import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { User } from '../Model/user';
import { Location } from '../Model/location';
import { Bien } from '../Model/bien';
import { JarwisService } from '../Services/jarwis.service';
import { select, Store } from '@ngrx/store';
import { getInfoUser } from '../Ngrx/auth.selector';
import { AppState } from '../Ngrx/store/state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { browserReload } from '../Ngrx/auth.actions';
//import { Chart, BarElement ,BarController, CategoryScale, Filler, Legend, Title, Tooltip} from 'chart.js';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private Jarwis:JarwisService,
    private store: Store<any>) {
     // Chart.register(BarElement, BarController, CategoryScale, Filler, Legend, Title, Tooltip);
     Chart.register(...registerables);
    }
    fileName='Bilan.xlsx';
 users=[] as any;
  user = new User() as any;
  bien = new Bien() as any;
  location = new Location() as any;
  charts=[] as any;
  dates=[] as any;
  montants=[] as any;
  charges=[] as any;
  bilan=[] as any;
  x:any;
  y:any;
  z:any;
  a:any;
  id:any;
  InfoUser:any;
  message:boolean=false;
  ngOnInit(): void {

   this.store.pipe(select(getInfoUser)).subscribe(
     (store:any)=> {
        console.log("hello "+store.user.prenom," id "+store.user.id);
       // JSON.stringify()
       this.InfoUser=store.user;
       localStorage.setItem('state', store.user);
      });
     this.user = localStorage.getItem('user');
  console.log("storage: "+this.user);
      console.log("infouser "+this.InfoUser.prenom);
   this.store.dispatch(browserReload({user:this.user}));
    this.listproprietaire();
    this.listlocataire();
    this.listlocation();
    this.listbien();

    this.Jarwis.getChats().subscribe(
      data1 => {console.log(data1);  this.charts=Object.values(data1);
        console.log(this.charts);
        
        this.dates = this.charts[0].map(function(elem:any){
          return elem.mois_paiement;
        
        });
        
        this.montants = this.charts[0].map(function(elem:any){
          return elem.montant;
        
        });
        this.charges = this.charts[1].map(function(elem:any){
          return elem.montant;
        });
        const data = {
         
          labels:this.dates,
          datasets: [{
            label: 'Les revenus',
            backgroundColor: 'rgb(102, 231, 145)',
            borderColor: 'rgb(102, 231, 145)',
          // data:[12350, 23300, 0, 0, 0, 0, 0 ,0],
            data:this.montants
          },]
        };
    var myChart = new Chart("myChart", {
      type: 'line',
      data,
      options: { }
    });
        
      }, error => console.log(error)
      );
     
    var ctx = document.getElementById('myChart');
    const labels = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre'
    ];


      this.Jarwis.getProPhyActif().subscribe(
        data => {console.log(data);  this.users=Object.values(data);}, error => console.log(error)
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

  listproprietaire(){
    return this.Jarwis.getproprietaire().subscribe(
    data => {
     // console.log(data);
      this.y=data;
      //console.log(data);
     // console.log(this.y);
      this.user=Object.values(data);
      console.log("prop: "+this.user);
    }, error => console.log(error)
    );
}

getBilan(id:any){
         this.message=true;
  this.Jarwis.getbilanbyid(id).subscribe(
    data => {
     // console.log(data);
      this.bilan=Object.values(data);
      console.log(this.bilan);
     // console.log("locataire: "+this.bilan.prenom);
    this.exportexcel();
    }, error => console.log(error)
      
    );
}
  listlocataire(){
     return this.Jarwis.getlocataire().subscribe(
      data => {
        this.x=data;
        //console.log(data);
       // console.log(this.x);
        this.user=Object.values(data);}, error => console.log(error),
      );
  }


listlocation(){
  return this.Jarwis.getlocation().subscribe(
  data => {
    //console.log(data);
    this.a=data;
    //console.log(data);
    //console.log(this.a);
    this.location=Object.values(data);}, error => console.log(error)
  );
}

listbien(){
  return this.Jarwis.getbien().subscribe(
  data => {
    //console.log(data);
    this.z=data;
   // console.log(data);
   // console.log(this.z);
    this.bien=Object.values(data);}, error => console.log(error)
  );
}



}
