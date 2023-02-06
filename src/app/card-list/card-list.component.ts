import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  cards$ !: CardModel[];
  
  constructor(private openAiService: OpenAiService) {
    this.cards = this.openAiService.cards;
  } 
}
