import { Component, Input } from '@angular/core';
import { CardModel } from '../models/card-model';
import { OpenAiService } from '../services/open-ai.service';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.scss']
})
export class SmallCardComponent {
  @Input('inputSmallCard') smallCard!: CardModel;

  constructor(private service: OpenAiService) {
  }

  isReadMore = true

  showText() {
    this.isReadMore = !this.isReadMore
  }
}
