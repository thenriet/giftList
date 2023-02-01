import { Component } from '@angular/core';
import { OpenAiService } from '../open-ai.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  constructor(private service: OpenAiService) {
  }

  isReadMore = true

  showText() {
    this.isReadMore = !this.isReadMore
  }
}
