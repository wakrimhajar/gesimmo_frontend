import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../Model/user';
import { Router } from '@angular/router';
import { JarwisService } from '../Services/jarwis.service';
@Component({
  selector: 'app-societe',
  templateUrl: './societe.component.html',
  styleUrls: ['./societe.component.css']
})
export class SocieteComponent implements OnInit {
 table:boolean=false;
  user = new User();
  users=[] as any ;
  id:any;
  imagepath:any='http://127.0.0.1:8000/storage/img/';

  constructor(private Jarwis:JarwisService,private router:Router) { }

  ngOnInit(): void {
  }
  onClick(){
    var element = document.getElementById("CloseButton") as any;
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

}
