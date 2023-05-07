import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from './card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient:HttpClient) { }

  saveCard(card:Card){
     return this.httpClient.post('http://localhost:8080/card',card);
  }
}
