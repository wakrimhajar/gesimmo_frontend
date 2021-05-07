import { Component, OnInit } from '@angular/core';
import { TokenService} from '../Services/token.service';
@Component({
  selector: 'app-session-proprietaire',
  templateUrl: './session-proprietaire.component.html',
  styleUrls: ['./session-proprietaire.component.css']
})
export class SessionProprietaireComponent implements OnInit {

constructor(private token: TokenService) { }

  ngOnInit(): void {

  }


}
