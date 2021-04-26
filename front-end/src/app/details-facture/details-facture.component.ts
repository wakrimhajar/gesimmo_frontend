import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf'
import html2canvas from 'html2canvas'
import { Charge } from '../Model/charge';
import { JarwisService } from '../Services/jarwis.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-details-facture',
  templateUrl: './details-facture.component.html',
  styleUrls: ['./details-facture.component.css']
})
export class DetailsFactureComponent implements OnInit {

  id :any;
  public charge: Charge = new Charge;
  constructor(private route: ActivatedRoute,private router: Router,private Jarwis:JarwisService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.Jarwis.getchargebyid(this.id)
    .subscribe(data => {
      //console.log(this.user)
   data[0]=this.id;
    console.log(data[0]);
    this.charge= data[0];
    console.log(data)
    this.charge=data;
    console.log(this.charge)
    }, error => console.log(error));
  }

  exportAsPDF()
  {
    var data = document.getElementById('pdf');
    html2canvas(data as any).then(canvas => {
      console.log(canvas);
      const contentDataURL = canvas.toDataURL('image/png')
      var imgHeight = canvas.height * 208 / canvas.width;
      console.log(imgHeight);
      let pdf = new jspdf('p', 'mm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0,208,imgHeight);
      pdf.save('charge.pdf');
    });
  }
  opensweetalert(){
    Swal.fire({
      title: 'Succés',
      text: 'Archiver avec succes!',
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








}
