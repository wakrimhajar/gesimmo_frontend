import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { User } from '../Model/user';
import { Location } from '../Model/location';
import { Bien } from '../Model/bien';
import { JarwisService } from '../Services/jarwis.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private Jarwis:JarwisService) { }
  user = new User() as any;
  bien = new Bien() as any;
  location = new Location() as any;
  x:any;
  y:any;
  z:any;
  a:any;
  ngOnInit(): void {
    this.listproprietaire();
    this.listlocataire();
    this.listlocation();
    this.listbien();
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
