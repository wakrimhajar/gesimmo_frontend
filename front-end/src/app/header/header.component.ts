import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService} from '../Services/token.service';
import { User } from '../Model/user';
import { JarwisService } from '../Services/jarwis.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public user : User=new User;
  toke:any;
  split:any;
  decode:any;
  id_user:any;
  constructor(private token: TokenService, private route :Router,private Jarwis: JarwisService) { }

  ngOnInit(): void {
    /*this.toke=this.token.get();
    console.log(this.toke);
    this.split=this.token.payload(this.toke);
    console.log(this.split);
    this.decode=this.token.decode(this.split);
    console.log(this.decode);*/
  }
  handleResponse(data:any){
    this.token.handle(data.access_token);
      this.id_user=data.user.id;
      console.log(this.id_user);
  }

logout(){
  this.token.remove();
  this.route.navigateByUrl('/');
}
onSubmit(){
  this.Jarwis.changerpassword(this.user).subscribe(
    data => console.log(data),
    error => console.log(error)
    );
  this.user = new User();
}
}
