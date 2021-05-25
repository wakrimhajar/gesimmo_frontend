import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { JarwisService } from '../Services/jarwis.service';
import { TokenService } from '../Services/token.service';

import { User } from '../Model/user';
import Swal from 'sweetalert2' ;
import { Bien } from '../Model/bien';
import { Store } from '@ngrx/store';
//import { AppState } from '../Ngrx/app.states';
import { loginStart, loginSuccess } from '../Ngrx/auth.actions';
import { getInfoUser } from '../Ngrx/auth.selector';
import { Observable } from 'rxjs';
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
  //userr:Observable<User>;
  id:any;
  bien = new Bien();
  biens=[] as any ;
  user = new User();
  message: boolean =false;
  id_user:any;
  
  public error=null;
  
  constructor(
     private Jarwis:JarwisService,
     private Token:TokenService,
     private router:Router,
     private Auth: AuthService,
     private store: Store<any>
     ) { }
   
     ngOnInit(): void {
   
      this.Jarwis.listBienImages().subscribe(
        data => {console.log(data);  this.biens=Object.values(data);}, error => console.log(error)
        );
    }
  onSubmit(){
    const payload = {
      email: this.user.email,
      password: this.user.password
     };
     const payload2 = {
      user: this.user,
      redirect: true
     };

      this.store.dispatch( loginStart(payload))
      this.store.dispatch(loginSuccess(payload2))
      
           this.id = this.store.select(getInfoUser);
       console.log("id: "+this.id);
     

         this.Jarwis.login(this.user.email,this.user.password).subscribe(
          data => {
            this.handleResponse(data)
    
            console.log(this.id_user);
          },
          error => this.handleError(error)
        );
     
      
        
       
  
  
  }
  handleResponse(data:any){
    var element = document.getElementById("CloseButton") as any;
    element.click();
    this.Token.handle(data.access_token);
    this.id_user=data.user.id;
    this.user= data.user;
    console.log(this.id_user);
    console.log('infos user: '+this.user.nom);
    this.router.navigate(['/header', this.id_user]);
  if(data.user.role==='gestionnaire'){
   this.router.navigateByUrl('/dashboard');
  // this.router.navigate(['/dashboar', this.id_user]);
  }
   else{console.log('vs n etes pas gestionnaire');}

   if(data.user.role==='proprietaire'){
    this.router.navigate(['/session-proprietaire', this.id_user]);
    this.router.navigate(['/header', this.id_user]);
   }
    else{console.log('vs n etes pas proprietaire');}
    if(data.user.role==='locataire'){
      this.router.navigate(['/session-locataire', this.id_user]);
     }
      else{console.log('vs n etes pas locataire');}
  }

  handleError(error:any){
    this.error = error.error.error;
  }

  //mot de passe oublié
  onSubmitPass(){
    this.message = true;
    this.Jarwis.sendMailToChangePass(this.user).subscribe(
      data => {
        var element = document.getElementById("CloseBtn") as any;
        element.click();
        console.log(data);
 
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
 
  getDetails(id:number){
    this.router.navigate(['/details', id]);
    console.log(id);
  }



}
