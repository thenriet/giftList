import { Component } from '@angular/core';
import { OpenAiService } from '../open-ai.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  text = 'cadeau';

  constructor(private service: OpenAiService) {
    this.service.getDataFromOpenAI(this.text);
  }

}
