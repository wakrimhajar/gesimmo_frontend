import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../Services/jarwis.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { User } from '../Model/user';
@Component({
  selector: 'app-session-locataire',
  templateUrl: './session-locataire.component.html',
  styleUrls: ['./session-locataire.component.css']
})
export class SessionLocataireComponent implements OnInit {
  location:boolean=false;
  id:any;
  locations=[] as any ;
  proprietaires=[] as any;
  biens=[] as any ;
  bien:boolean=false;
  prop:boolean=false;
  paiement:boolean=false;
  paiements=[] as any ;
  public user: User = new User;
  constructor(private route: ActivatedRoute,private router: Router,private Jarwis:JarwisService) { }

  ngOnInit(): void {
  }
  listActif(){
    this.Jarwis.location(this.id).subscribe(
      data => {console.log(data);
      this.locations=Object.values(data);
    console.log(this.locations)},
      error => console.log(error)
      );
      this.location=true;
      this.bien=false;
      this.prop=false;
      this.paiement=false;

  }

  locations_users()
  {
    this.id = this.route.snapshot.params['id'];
    this.Jarwis.getuserbyid(this.id)
    .subscribe(data => {
    console.log(this.user)
    data=this.id;
    console.log(data[0]);
    this.user= data[0];
    console.log(data)
    this.user=data;
    console.log(this.user)
    }, error => console.log(error));
    this.listActif();
  }
  listBien(){
    this.Jarwis.bien(this.id).subscribe(
      data => {console.log(data);
      this.biens=Object.values(data);
    console.log(this.biens)},
      error => console.log(error)
      );
      this.location=false;
      this.bien=true;
      this.prop=false;
      this.paiement=false;

  }
  biens_users()
  {
    this.id = this.route.snapshot.params['id'];
    this.Jarwis.getuserbyid(this.id)
    .subscribe(data => {
    console.log(this.user)
    data=this.id;
    console.log(data[0]);
    this.user= data[0];
    console.log(data)
    this.user=data;
    console.log(this.user)
    }, error => console.log(error));
    this.listBien();
  }

  listProprietaire(){
    this.Jarwis.proprietaire(this.id).subscribe(
      data => {console.log(data);
      this.proprietaires=Object.values(data);
    console.log(this.proprietaires)},
      error => console.log(error)
      );
      this.location=false;
      this.bien=false;
      this.prop=true;
      this.paiement=false;

  }
  proprietaire()
  {
    this.id = this.route.snapshot.params['id'];
    this.Jarwis.getuserbyid(this.id)
    .subscribe(data => {
    console.log(this.user)
    data=this.id;
    console.log(data[0]);
    this.user= data[0];
    console.log(data)
    this.user=data;
    console.log(this.user)
    }, error => console.log(error));
    this.listProprietaire();
  }

  listPaiement(){
    this.Jarwis.paloc(this.id).subscribe(
      data => {console.log(data);
      this.paiements=Object.values(data);
    console.log(this.paiements)},
      error => console.log(error)
      );
      this.location=false;
      this.bien=false;
      this.prop=false;
      this.paiement=true;

  }
  paiemen()
  {
    this.id = this.route.snapshot.params['id'];
    this.Jarwis.getuserbyid(this.id)
    .subscribe(data => {
    console.log(this.user)
    data=this.id;
    console.log(data[0]);
    this.user= data[0];
    console.log(data)
    this.user=data;
    console.log(this.user)
    }, error => console.log(error));
    this.listPaiement();
  }

}
