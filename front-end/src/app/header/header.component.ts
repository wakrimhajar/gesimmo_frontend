import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TokenService} from '../Services/token.service';
import { User } from '../Model/user';
import { JarwisService } from '../Services/jarwis.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../Ngrx/store/state';
import { getInfoUser, isAuthenticated } from '../Ngrx/auth.selector';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public user : User=new User;
  id:any;
  id_user:any;
  notifications=[] as any ;
  InfoUser:any;
  isAuthenticated:  Observable<boolean> | undefined;
  constructor(private router: ActivatedRoute,private token: TokenService, private route :Router,private Jarwis: JarwisService,private store:Store<any>) { }

  ngOnInit(): void {
    this.store.pipe(select(getInfoUser)).subscribe(
      (store:any)=> {
         console.log("hello "+store.user.prenom," id "+store.user.id);
        // JSON.stringify()
        this.user=store.user;
       });
       console.log("infouser "+this.user.prenom);
    this.isAuthenticated = this.store.select(isAuthenticated);
   /* this.id = this.router.snapshot.params['id'];
    this.Jarwis.getuser(this.id)
    .subscribe(data => {
    console.log(this.user)
    data[0]=this.id;
    console.log(data[0]);
    this.user= data[0];
    //console.log(data)
    this.user=data;
    console.log(this.user)
    }, error => console.log(error));*/
    this.Jarwis.getnotification(this.user.id).subscribe(
      data => {console.log(data);
        this.notifications=Object.values(data.notif);
       console.log(this.notifications);

      },
      error => console.log(error)
      );
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
    this.Jarwis.changerpassword(this.user.id,this.user).subscribe(
    data => console.log(data),
    error => console.log(error)
    );
    this.user = new User();
    var element = document.getElementById("CloseButton") as any;
    element.click();
  }

}
