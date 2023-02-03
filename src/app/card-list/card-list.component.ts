import { Component } from '@angular/core';
import { CardModel } from '../models/card-model';
import { OpenAiService } from '../open-ai.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {
  cards!:CardModel[]

  constructor(private service: OpenAiService) {
    this.cards = this.service.cards;
  }

}
