import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { JarwisService } from '../Services/jarwis.service';
import { TokenService } from '../Services/token.service';

import { User } from '../Model/user';
import Swal from 'sweetalert2' ;
import { Bien } from '../Model/bien';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public form = {
    email:null,
    password:null,
    type_user:null
  };
  bien = new Bien();
  biens=[] as any ;
  user = new User();
  message: boolean =false;

  public error=null;
  constructor(
     private Jarwis:JarwisService,
     private Token:TokenService,
     private router:Router,
     private Auth: AuthService,
     ) { }
  onSubmit(){
   this.Jarwis.login(this.form).subscribe(
      data => {
        this.handleResponse(data)
        var element = document.getElementById("CloseButton") as any;
        element.click();
      },
      error => this.handleError(error)

    );
  }
  handleResponse(data:any){
    this.Token.handle(data.access_token);
    if(data.user.role==='gestionnaire'){
   this.router.navigateByUrl('/dashboard');
  }
   else{console.log('vs n etes pas gestionnaire');}

  }
  handleError(error:any){
    this.error = error.error.error;

  }

  //mot de passe oublié
  onSubmitPass(){
    this.message = true;
    this.Jarwis.sendMailToChangePass(this.user).subscribe(
      data => {

        console.log(data);

        var element = document.getElementById("CloseButton") as any;
        element.click();
        this.alert();
        this.message = false;
        },
        error => {
          this.handleError(error);


      }


    );

  }
  alert(){
    Swal.fire({
      title: 'Un email de réientialisation est envoyé ',
      width: 800,
      text: 'Un nouveau mot de passe a été envoyé avec succes à votre adresse   '+this.user.email,
      icon: 'success',
      showCancelButton: false,

      confirmButtonText: 'Terminer',
      cancelButtonText: 'No, keep it'
    })
  }
  ngOnInit(): void {
    this.Jarwis.listBienImages().subscribe(
      data => {console.log(data);  this.biens=Object.values(data);}, error => console.log(error)
      );
  }

}
