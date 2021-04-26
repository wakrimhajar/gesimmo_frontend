import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { JarwisService } from '../Services/jarwis.service';
import { TokenService } from '../Services/token.service';
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
  ngOnInit(): void {
  }

}
