import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CardModel } from '../models/card-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({providedIn:'root'})
export class ApiService {
 
  baseURL: string = "http://localhost:3000/";
  cardsInDB !: CardModel[];
 
  constructor(private http: HttpClient) {
    
  }
 
  getCards(): Observable<CardModel[]> {
    console.log('getCards '+this.baseURL + 'cards')
    return this.http.get<CardModel[]>(this.baseURL + 'cards')
  }
 
  addCard(card:CardModel): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body = JSON.stringify(card);
    return this.http.post(this.baseURL + 'cards', body,{'headers':headers})
  }
}
 
