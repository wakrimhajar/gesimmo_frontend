import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService} from '../Services/token.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private token: TokenService, private route :Router) { }

  ngOnInit(): void {
  }
logout(){
  this.token.remove();
  this.route.navigateByUrl('/');
}
}
