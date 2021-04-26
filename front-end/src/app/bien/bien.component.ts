import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bien } from '../Model/bien';
import { Router } from '@angular/router';
import { JarwisService } from '../Services/jarwis.service';
@Component({
  selector: 'app-bien',
  templateUrl: './bien.component.html',
  styleUrls: ['./bien.component.css']
})
export class BienComponent implements OnInit {

  table:boolean=false;
  bien = new Bien();
  biens=[] as any ;
  constructor(private Jarwis:JarwisService,private router:Router) { }


  ngOnInit(): void {

  }
  listActif(){
    this.Jarwis.getbienActif().subscribe(
      data => {console.log(data);
         this.biens=Object.values(data);

        }
         , error => console.log(error)
      );

      this.table=true;
  }
  listArchiv(){
    this.Jarwis.getbienArchiv().subscribe(
      data => {console.log(data);  this.biens=Object.values(data);}, error => console.log(error)
      );
      this.table=true;
  }

  detailbien(id : number){

    this.router.navigate(['/details-bien', id]);
    console.log(id);

}

}
