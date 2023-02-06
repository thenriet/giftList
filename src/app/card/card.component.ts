import { Component, Input } from '@angular/core';
import { CardModel } from '../models/card-model';
import { OpenAiService } from '../services/open-ai.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input('inputCard') card!: CardModel;
  @Input('inputCard$') cards$!: CardModel;


  constructor(private service: OpenAiService) {
  }

  isReadMore = true

  showText() {
    this.isReadMore = !this.isReadMore
  }
}
