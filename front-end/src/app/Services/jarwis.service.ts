import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JarwisService {
 private baseUrl = 'http://localhost:8000/api/auth';
  constructor(private http:HttpClient) { }
 login(data: any){
   return  this.http.post(`${this.baseUrl}/login`,data)
 }
 logout(data: any){
  return  this.http.post(`${this.baseUrl}/logout`,data)
}
addlocataire(data: any){
  return  this.http.post(`${this.baseUrl}/addLocP`,data)
 }
addlocatairemor(data: any){
  return  this.http.post(`${this.baseUrl}/addLocM`,data)
 }
 addpropriétaire(data: any){
  return  this.http.post(`${this.baseUrl}/AddProprietaire`,data)
 }
 addsociete(data: any){
  return  this.http.post(`${this.baseUrl}/AddSociete`,data)
 }
 addlocation(data: any){
  return  this.http.post(`${this.baseUrl}/addLocation`,data)
 }
 addcharge(data: any){
  return  this.http.post(`${this.baseUrl}/addCharge`,data)
 }
 addpaiement(data: any){
  return  this.http.post(`${this.baseUrl}/addPaiement`,data)
 }
 addbien(data: any){
  return  this.http.post(`${this.baseUrl}/AddBien`,data)
 }
 getLocPhyActif(){
  return  this.http.get(`${this.baseUrl}/getLocPhyActif`)
 }
 getLocPhyArchiv(){
  return  this.http.get(`${this.baseUrl}/getLocPhyArchive`)
 }
 getProPhyActif(){
  return  this.http.get(`${this.baseUrl}/getProPhyActif`)
 }
 getProPhyArchiv(){
  return  this.http.get(`${this.baseUrl}/getProPhyArchive`)
 }
 getbienActif(){
  return  this.http.get(`${this.baseUrl}/getBienActif`)
 }
 getbienArchiv(){
  return  this.http.get(`${this.baseUrl}/getBienArchive`)
 }
 getbienLibre(){
  return  this.http.get(`${this.baseUrl}/getBienLibre`)
 }
 getlocationActif(){
  return  this.http.get(`${this.baseUrl}/getLocationActif`)
 }
 getlocationArchiv(){
  return  this.http.get(`${this.baseUrl}/getLocationArchive`)
 }
 getchargeActif(){
  return  this.http.get(`${this.baseUrl}/getChargeActif`)
 }
 getchargeArchiv(){
  return  this.http.get(`${this.baseUrl}/getChargeArchive`)
 }
 getlocataire(){
  return  this.http.get(`${this.baseUrl}/counlocataire`)
 }
 getproprietaire(){
  return  this.http.get(`${this.baseUrl}/countproprietaire`)
 }
 getlocation(){
  return  this.http.get(`${this.baseUrl}/countlocation`)
 }
 getbien(){
  return  this.http.get(`${this.baseUrl}/countbien`)
 }
 getuserbyid(id: number): Observable<any> {
  return  this.http.get(`${this.baseUrl}/getUserById/`+id)
 }
 getuser(id: number): Observable<any> {
  return  this.http.get(`${this.baseUrl}/getUser/`+id)
 }
 getchargebyid(id: number): Observable<any> {
  return  this.http.get(`${this.baseUrl}/getchargeById/`+id)
 }
 archiverUser(id: number,data:any){
  return  this.http.put(`${this.baseUrl}/archiverUser/`+id,data)
 }
 updateP(id: number,data:any){
  return  this.http.put(`${this.baseUrl}/update/`+id,data)
 }
 getlocatairebyid(id: number): Observable<any> {
  return  this.http.get(`${this.baseUrl}/getlocataireById/`+id)
 }
 getbienbyid(id: number): Observable<any> {
  return  this.http.get(`${this.baseUrl}/getbienById/`+id)
 }
 getlocationbyid(id: number): Observable<any> {
  return  this.http.get(`${this.baseUrl}/getlocationById/`+id)
 }
 archiverBien(id: number,data:any){
  return  this.http.put(`${this.baseUrl}/archiverBien/`+id,data)
 }
 archiverLocation(id: number,data:any){
  return  this.http.put(`${this.baseUrl}/archiverLocation/`+id,data)
 }
 updatelocation(id: number,data:any){
  return  this.http.put(`${this.baseUrl}/updatelocation/`+id,data)
 }
 updatebien(id: number,data:any){
  return  this.http.put(`${this.baseUrl}/updatebien/`+id,data)
 }
 updatemorale(id: number,data:any){
  return  this.http.put(`${this.baseUrl}/updateMorale/`+id,data)
 }
 sendMailToChangePass(data: any){
  return  this.http.post(`${this.baseUrl}/sendMailChangePass`,data)
 }
 listBienImages(){
  return  this.http.get(`${this.baseUrl}/biens`)
 }
 bienprop(id: number){
  return  this.http.get(`${this.baseUrl}/bie_prop/`+id);
 }
getImmoById(id:number): Observable<any>{
  return this.http.get(`${this.baseUrl}/getImmoById/`+id)
}
chercher(search:string): Observable<any>{
  return this.http.get(`${this.baseUrl}/search/`+search)
}
chercherbien(search:string): Observable<any>{
  return this.http.get(`${this.baseUrl}/searchbien/`+search)
}
chercherccharge(search:string): Observable<any>{
  return this.http.get(`${this.baseUrl}/searchcharge/`+search)
}
getnotification(id: number): Observable<any>{
  return this.http.get(`${this.baseUrl}/Affnotification/`+id)
}
changerpassword(id: number,data:any): Observable<any>{
  return this.http.put(`${this.baseUrl}/change_password/`+id,data)
}
}

