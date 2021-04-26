import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '../Model/location';
import { JarwisService } from '../Services/jarwis.service';
import {NgForm} from '@angular/forms';
import { Bien } from '../Model/bien';
import { User } from '../Model/user';
@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit {
  public location : Location=new Location;
  id: any;
  bien = new Bien();
  biens=[] as any ;
  user = new User();
  users=[] as any ;
  constructor(private route: ActivatedRoute,private router: Router,private Jarwis: JarwisService) { }

  ngOnInit(): void {
    this.listLocataire();
    this.listActif();


    this.id = this.route.snapshot.params['id'];
    this.Jarwis.getlocationbyid(this.id)
    .subscribe(data => {
      //console.log(this.user)
   data[0]=this.id;
    console.log(data[0]);
    this.location= data[0];
    console.log(data)
    this.location=data;
    console.log(this.location)
    }, error => console.log(error));
  }

  onSubmitform(f: NgForm) {
    this.Jarwis.updatelocation(this.id, this.location).subscribe(
      data => console.log(data), error => console.log(error)
      );
    this.location = new Location();
    this.router.navigate(['/location']);
}

listActif(){
  this.Jarwis.getbienActif().subscribe(
    data => {console.log(data);  this.biens=Object.values(data);}, error => console.log(error)
    );

}
listLocataire(){
  this.Jarwis.getLocPhyActif().subscribe(
    data => {console.log(data);  this.users=Object.values(data);}, error => console.log(error)
    );
}

opensweetalert(){
  Swal.fire({
    title: 'Succés',
    text: 'Modification avec succes!',
    icon: 'success',
    showCancelButton: false,
    confirmButtonText: 'OK!',
    cancelButtonText: 'No, keep it'
  })
 }

 erreur(){
  Swal.fire({
    title: 'Ereur',
    text: 'Erreur!',
    icon: 'error',
    showCancelButton: false,
    confirmButtonText: 'OK!',
    cancelButtonText: 'No, keep it'
  })
 }

 onClick(){
  var element = document.getElementById("CloseButton") as any;
  element.click();

  if(Object.values(this.location).length!=0)
    this.opensweetalert();
  else
    this.erreur();
}

close(){
  var element = document.getElementById("CloseButton") as any;
  element.click();
}


}
