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
  //filedata:any = [];
  filedata=[] as any;
  ngOnInit(): void {
    this.listActif();

    this.dropdownList = [
      {  key: 1, value: 'Table' },
      {  key: 2, value: 'Chaise' },
      {  key: 3, value: 'Bureau' },
      {  key: 4, value: 'Fauteuil' },
      {  key: 5, value: 'Canapé' },
      {  key: 6, value: 'Lit' },
      {  key: 7, value: 'Commode' },
      {  key: 8, value: 'Luminaire' },
      {  key: 9, value: 'Television' },
      {  key: 10, value: 'Meuble Télé ' },
      {  key: 11, value: 'Vaisselle' },
      {  key: 12, value: 'Tabouret' },
      {  key: 13, value: 'Meuble de cuisine' },
      {  key: 14, value: 'Wifi' },
      {  key: 15, value: 'Ascenseur' },
      {  key: 16, value: 'Materiel de jardin' },
      {  key: 17, value: 'Haut parleur' },
      {  key: 18, value: 'DVD et livres' },
      {  key: 19, value: 'Produits de toilette' },
      {  key: 20, value: 'Autres ' }
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
  
  fileEvent(e:any){
     for(let i=0;i<e.target.files.length;i++){
      var img = e.target.files[i];
       this.filedata.push(img);
     console.log(this.filedata);
     }
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
    for(let i=0;i<this.filedata.length;i++){
     
    myFormData.append('images', this.filedata[i]);
    console.log(this.filedata[i]);}
  
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
