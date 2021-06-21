import { Component, OnInit } from '@angular/core';
import { TokenService} from '../Services/token.service';
import { JarwisService } from '../Services/jarwis.service';
import { User } from '../Model/user';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-session-proprietaire',
  templateUrl: './session-proprietaire.component.html',
  styleUrls: ['./session-proprietaire.component.css']
})
export class SessionProprietaireComponent implements OnInit {
id:any;
bien:boolean=false;
location:boolean=false;
paiement:boolean=false;
charge:boolean=false;
biens=[] as any ;
public user: User = new User;
constructor(private route: ActivatedRoute,private router: Router,private token: TokenService,private Jarwis:JarwisService) { }

  ngOnInit(): void {

  }

  listActif(){
    this.Jarwis.bienprop(this.id).subscribe(
      data => {console.log(data);
        this.biens=Object.values(data);},
        error => console.log(error)
      );
      this.bien=true;
  }

  bien_user()
  {
    this.id = this.route.snapshot.params['id'];
    this.Jarwis.getuserbyid(this.id)
    .subscribe(data => {
    console.log(this.user)
    data[0]=this.id;
    console.log(data[0]);
    this.user= data[0];
    console.log(data)
    this.user=data;
    console.log(this.user)
    }, error => console.log(error));
    this.listActif();
  }

  location_user()
  {
    this.bien=false;
    this.location=true;
  }

  paiement_user()
  {
    this.bien=false;
    this.location=false;
    this.paiement=true;
  }

  charge_user()
  {
    this.bien=false;
    this.location=false;
    this.paiement=false;
    this.charge=true;
  }

 /* detailbien(id : number){
    this.router.navigate(['/details-bien', id]);
    console.log(id);
  }*/
}
