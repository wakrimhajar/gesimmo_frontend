import { Component, OnInit } from '@angular/core';
import { Bien } from '../Model/bien';
import { Router } from '@angular/router';
import { JarwisService } from '../Services/jarwis.service';
import { TokenService } from '../Services/token.service';
import Swal from 'sweetalert2' ;
import { User } from '../Model/user';
import { analyzeAndValidateNgModules, ConditionalExpr, createOfflineCompileUrlResolver } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'app-create-bien',
  templateUrl: './create-bien.component.html',
  styleUrls: ['./create-bien.component.css']
})
export class CreateBienComponent implements OnInit {

  constructor(private Jarwis:JarwisService,private router:Router,private Token:TokenService) { }
  bien=new Bien;
  user = new User();
  users=[] as any ;
  dropdownList:any = [];
  selectedItems:any = [];
  dropdownSettings:any = {};
  //obj:any;
  ngOnInit(): void {
    this.listActif();

    this.dropdownList = [
      {  key: 1, value: 'Mumbai' },
      {  key: 2, value: 'Bangaluru' },
      {  key: 3, value: 'Pune' },
      {  key: 4, value: 'Navsari' },
      {  key: 5, value: 'New Delhi' }
    ];
    this.dropdownSettings= {
      singleSelection: false,
      idField: 'key',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onSubmit(){
    var myFormData = new FormData();
    myFormData.append('adresse',this.bien.adresse);
    myFormData.append('user_id',this.bien.user_id);
    myFormData.append('identifiant',this.bien.identifiant);
    myFormData.append('code_postal',this.bien.code_postal);
    myFormData.append('surface',this.bien.surface);
    myFormData.append('loyer_mensuel',this.bien.loyer_mensuel);
    myFormData.append('syndic',this.bien.syndic);
    myFormData.append('taxe_habitation',this.bien.taxe_habitation);
    myFormData.append('nbr_piece',this.bien.nbr_piece);
    myFormData.append('etage',this.bien.etage);
    myFormData.append('porte',this.bien.porte);
    myFormData.append('type',this.bien.type);
    var equipements=this.selectedItems.map((obj: { value: any; })=>obj.value).join(' , ');
    console.log(equipements);
    myFormData.append('equipement',equipements);
    this.Jarwis.addbien(myFormData).subscribe(
      data => console.log(myFormData), error => console.log(error));
    this.bien = new Bien();
   }
   opensweetalert(){
    Swal.fire({
      title: 'Succés',
      text: 'Ajout avec succes!',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'OK!',
      cancelButtonText: 'No, keep it'
    })
   }

   erreur(){
    Swal.fire({
      title: 'Ereur',
      text: 'Erreur!',
      icon: 'error',
      showCancelButton: false,
      confirmButtonText: 'OK!',
      cancelButtonText: 'No, keep it'
    })
   }

  alert(){
     if(Object.values(this.bien).length!=0)
      this.opensweetalert();
    else
    this.erreur();
   }

   listActif(){
    this.Jarwis.getProPhyActif().subscribe(
      data => {console.log(data);  this.users=Object.values(data);}, error => console.log(error)
      );
  }


  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
