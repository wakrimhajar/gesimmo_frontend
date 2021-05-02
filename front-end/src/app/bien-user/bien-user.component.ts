import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../Services/jarwis.service';
import { User } from '../Model/user';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-bien-user',
  templateUrl: './bien-user.component.html',
  styleUrls: ['./bien-user.component.css']
})
export class BienUserComponent implements OnInit {

  constructor(private route: ActivatedRoute,private Jarwis:JarwisService,private router:Router) { }
  table:boolean=false;
  bien = new User();
  biens=[] as any ;
  id:any;
  public user: User = new User;
  ngOnInit(): void {
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

  listActif(){
    this.Jarwis.bienprop(this.id).subscribe(
      data => {console.log(data);  this.biens=Object.values(data);}, error => console.log(error)
      );
      this.table=true;
  }

  detailbien(id : number){

    this.router.navigate(['/details-bien', id]);
    console.log(id);

}

}
