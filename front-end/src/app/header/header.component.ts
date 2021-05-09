import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
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
  id:any;
  id_user:any;
  constructor(private router: ActivatedRoute,private token: TokenService, private route :Router,private Jarwis: JarwisService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.Jarwis.getuser(this.id)
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
  handleResponse(data:any){
    this.token.handle(data.access_token);
      this.id_user=data.user.id;
      console.log(this.id_user);
  }

logout(){
  this.token.remove();
  this.route.navigateByUrl('/');
}
onSubmit()
{
  console.log(this.id)
    this.Jarwis.changerpassword(this.id,this.user).subscribe(
    data => console.log(data),
    error => console.log(error)
    );
    this.user = new User();
  }
}
