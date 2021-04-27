import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bien } from '../Model/bien';
import { User } from '../Model/user';
import { JarwisService } from '../Services/jarwis.service';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-edit-bien',
  templateUrl: './edit-bien.component.html',
  styleUrls: ['./edit-bien.component.css']
})
export class EditBienComponent implements OnInit {
  public bien : Bien=new Bien;
  id: any;
  user = new User();
  users=[] as any ;
  dropdownList:any = [];
  selectedItems:any = [];
  dropdownSettings:any = {};
  constructor(private route: ActivatedRoute,private router: Router,private Jarwis: JarwisService) { }

  ngOnInit(): void {
    this.listActif();
    this.id = this.route.snapshot.params['id'];
    this.Jarwis.getbienbyid(this.id)
    .subscribe(data => {
      //console.log(this.user)
   data[0]=this.id;
    console.log(data[0]);
    this.bien= data[0];
    console.log(data)
    this.bien=data;
    console.log(this.bien)
    }, error => console.log(error));


    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];

    /*this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];*/
    this.dropdownSettings= {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }
  onSubmit() {
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
    this.Jarwis.updatebien(this.id, myFormData).subscribe(
      data => console.log(myFormData), error => console.log(error)
      );
    this.bien = new Bien();
    this.router.navigate(['/bien']);
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


 listActif(){
  this.Jarwis.getProPhyActif().subscribe(
    data => {console.log(data);  this.users=Object.values(data);}, error => console.log(error)
    );
}

onClick(){
  var element = document.getElementById("CloseButton") as any;
  element.click();

  if(Object.values(this.bien).length!=0)
    this.opensweetalert();
  else
    this.erreur();
    this.router.navigate(['bien'])
}

onItemSelect(item: any) {
  console.log(item);
}
onSelectAll(items: any) {
  console.log(items);
}


close(){
  var element = document.getElementById("CloseButton") as any;
  element.click();
}

}
