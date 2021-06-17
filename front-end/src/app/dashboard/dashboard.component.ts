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
 
  user = new User() as any;
  bien = new Bien() as any;
  location = new Location() as any;
  x:any;
  y:any;
  z:any;
  a:any;
  id:any;
  InfoUser:any;
  ngOnInit(): void {

   this.store.pipe(select(getInfoUser)).subscribe(
     (store:any)=> {
        console.log("hello "+store.user.prenom," id "+store.user.id);
       // JSON.stringify()
       this.InfoUser=store.user;
       localStorage.setItem('state', store.user);
      });
     var infos = sessionStorage.getItem('user');
     console.log("storage: "+infos);
      console.log("infouser "+this.InfoUser.prenom);
    this.store.dispatch(browserReload(this.user))
    this.listproprietaire();
    this.listlocataire();
    this.listlocation();
    this.listbien();

/*SELECT mois_paiement,SUM(montant_recu) FROM
 `factures` WHERE YEAR(NOW())=YEAR(mois_paiement) 
 GROUP BY mois_paiement;
*/ 
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
    const data = {
      labels: labels,
      datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45 ],
        
      },
      {
        label: 'My Second dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [10, 2, 50, 30, 20, 45, 30 ],
        
      }]
    };
var myChart = new Chart("myChart", {
  type: 'line',
  data,
  options: {}
});

  }

  listproprietaire(){
    return this.Jarwis.getproprietaire().subscribe(
    data => {
     // console.log(data);
      this.y=data;
      //console.log(data);
     // console.log(this.y);
      this.user=Object.values(data);}, error => console.log(error)
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
