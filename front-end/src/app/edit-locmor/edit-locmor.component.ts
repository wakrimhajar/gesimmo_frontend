import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../Model/user';
import { JarwisService } from '../Services/jarwis.service';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-edit-locmor',
  templateUrl: './edit-locmor.component.html',
  styleUrls: ['./edit-locmor.component.css']
})
export class EditLocmorComponent implements OnInit {
  public user : User=new User;
  id: any;
  constructor(private route: ActivatedRoute,private router: Router,private Jarwis: JarwisService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.Jarwis.getlocatairebyid(this.id)
    .subscribe(data => {
      console.log(this.user)
   data[0]=this.id;
    console.log(data[0]);
    this.user= data[0];
    console.log(data)
    this.user=data;
    console.log(this.user)
    }, error => console.log(error));
  }

  onSubmitform(f: NgForm) {
    this.Jarwis.updatemorale(this.id, this.user).subscribe(
      data => console.log(data),
      error => console.log(error)
      );
    this.user = new User();
    this.router.navigate(['/locataire']);
}

opensweetalert(){
  Swal.fire({
    title: 'Succés',
    text: 'Modifier avec succes!',
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
  var element = document.getElementById("CloseButMS") as any;
  element.click();

  if(Object.values(this.user).length!=0)
    this.opensweetalert();
  else
    this.erreur();
}

close(){
  var element = document.getElementById("CloseButMS") as any;
  element.click();
}

}
