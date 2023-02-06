import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CardModel } from '../models/card-model';
import { ApiService } from '../services/api.service';
import { OpenAiService } from '../services/open-ai.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {
  cards !: CardModel[];
  
  constructor(private openAiService: OpenAiService, private ApiService: ApiService, private route: Router) {
    if (this.route.url === "/"){
      this.cards = this.openAiService.cards;
    } else if (this.route.url === "/history"){
      this.ApiService.getCards()
      .subscribe(data => {
        this.cards=data;
       })   
     }
  }
}

