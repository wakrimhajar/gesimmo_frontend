import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2' ;
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
   erreur(){
    Swal.fire({
      title: 'Accés refusé',
      text: 'Vous n\'etes pas autorisé à accéder à cette application',
      icon: 'error',
      showCancelButton: false,
      confirmButtonText: 'OK!',
      cancelButtonText: 'No, keep it'
    })
   }

  canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> |
  boolean | UrlTree {
  const token = localStorage.getItem('token');
  if (token) {
  return true;
  }
  else {
  this.router.navigateByUrl('/');
  //this.erreur();
  return false;

  }
  }


}
