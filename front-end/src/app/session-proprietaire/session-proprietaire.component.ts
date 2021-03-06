import { Component, OnInit } from '@angular/core';
import { TokenService} from '../Services/token.service';
import { JarwisService } from '../Services/jarwis.service';
import { User } from '../Model/user';
import { Chart, registerables } from 'chart.js';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-session-proprietaire',
  templateUrl: './session-proprietaire.component.html',
  styleUrls: ['./session-proprietaire.component.css']
})
export class SessionProprietaireComponent implements OnInit {
id:any;
bien:boolean=false;
location:boolean=false;
paiement:boolean=false;
charts=[] as any;
charge:boolean=false;
bilan:boolean=true;
biens=[] as any ;
charges=[] as any;
locataires=[] as any ;
paiements=[] as any ;
dates=[] as any;
montants=[] as any;
public user: User = new User;
constructor(private route: ActivatedRoute,private router: Router,private token: TokenService,private Jarwis:JarwisService) { 
  Chart.register(...registerables);
}

  ngOnInit(): void {
    this.chart();
  }

  listActif(){
    this.Jarwis.bienprop(this.id).subscribe(
      data => {console.log(data);
        this.biens=Object.values(data);},
        error => console.log(error)
      );
      this.bien=true;
      this.location=false;
      this.paiement=false;
      this.charge=false;
      this.bilan=false;
  }

  bien_user()
  {
    this.id = this.route.snapshot.params['id'];
    this.Jarwis.getuserbyid(this.id)
    .subscribe(data => {
    console.log(this.user)
    data[0]=this.id;
    console.log(data[0]);
    this.user= data[0];
    console.log(data)
    this.user=data;
    console.log(this.user)
    }, error => console.log(error));
    this.listActif();
  }

  listLocataire(){
    this.Jarwis.locataire(this.id).subscribe(
      data => {console.log(data);
        this.locataires=Object.values(data);},
        error => console.log(error)
      );
      this.bien=false;
      this.location=true;
      this.paiement=false;
      this.charge=false;
      this.bilan=false;
  }

  locataire()
  {
    this.id = this.route.snapshot.params['id'];
    this.Jarwis.getuserbyid(this.id)
    .subscribe(data => {
    console.log(this.user)
    data[0]=this.id;
    console.log(data[0]);
    this.user= data[0];
    console.log(data)
    this.user=data;
    console.log(this.user)
    }, error => console.log(error));
    this.listLocataire();
  }


  listCharge(){
    this.Jarwis.charge(this.id).subscribe(
      data => {console.log(data);
        this.charges=Object.values(data);},
        error => console.log(error)
      );
      this.bien=false;
      this.location=false;
      this.paiement=false;
      this.charge=true;
      this.bilan=false;
  }

  charge_user()
  {
    this.id = this.route.snapshot.params['id'];
    this.Jarwis.getuserbyid(this.id)
    .subscribe(data => {
    console.log(this.user)
    data[0]=this.id;
    console.log(data[0]);
    this.user= data[0];
    console.log(data)
    this.user=data;
    console.log(this.user)
    }, error => console.log(error));
    this.listCharge();
   
  }

  BilanPaiement(){
    this.Jarwis.bilanpro(this.id).subscribe(
      data1 => {console.log(data1);
        this.charts=Object.values(data1);
        console.log("charts "+this.charts);
        this.dates = this.charts.map(function(elem:any){
          return elem.mois_paiement;
        });
        
        this.montants = this.charts.map(function(elem:any){
          return elem.montant;
        });

        const data = {
         
          labels:this.dates,
          datasets: [{
            label: 'Les b??n??fices',
            backgroundColor: 'rgb(102, 231, 145)',
            borderColor: 'rgb(102, 231, 145)',
         
            data:this.montants
          },
         ]
        };
        var myChart = new Chart("myChart", {
          type: 'line',
          data,
          options: { }
        });
      },
        error => console.log(error)
      );
      this.bien=false;
    this.location=false;
    this.paiement=false;
    this.charge=false;
    this.bilan=true;
  }


  listPaiement(){
    this.Jarwis.paipro(this.id).subscribe(
      data => {console.log(data);
        this.paiements=Object.values(data);},
        error => console.log(error)
      );
      this.bien=false;
    this.location=false;
    this.paiement=true;
    this.charge=false;
    this.bilan=false;
  }


  paiement_user()
  {
    this.id = this.route.snapshot.params['id'];
    this.Jarwis.getuserbyid(this.id)
    .subscribe(data => {
    console.log(this.user)
    data[0]=this.id;
    console.log(data[0]);
    this.user= data[0];
    console.log(data)
    this.user=data;
    console.log(this.user)
    }, error => console.log(error));
    this.listPaiement();
  }

  chart()
  {
    this.id = this.route.snapshot.params['id'];
    this.Jarwis.getuserbyid(this.id)
    .subscribe(data => {
    console.log(this.user)
    data[0]=this.id;
    console.log(data[0]);
    this.user= data[0];
    console.log(data)
    this.user=data;
    console.log(this.user)
    }, error => console.log(error));
    this.BilanPaiement();
  }

}
