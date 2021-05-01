import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bien } from '../Model/bien';
import { JarwisService } from '../Services/jarwis.service';

@Component({
  selector: 'app-details-immobilier',
  templateUrl: './details-immobilier.component.html',
  styleUrls: ['./details-immobilier.component.css']
})
export class DetailsImmobilierComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router,private jawris: JarwisService) { }


  id :any;
  public bien: Bien = new Bien;
  Allimages:any =[];
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.jawris.getImmoById(this.id)
    .subscribe(data => {
   data[0]=this.id;
    this.bien= data[0];
    this.bien=data;
    this.Allimages.push(this.bien.images);
    console.log(this.Allimages);
    console.log(this.bien)
    }, error => console.log(error));
  }

  

}
