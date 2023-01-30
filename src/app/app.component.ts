import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OpenAiService } from './open-ai.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'giftList';
  text = 'idée de cadeau';

  constructor(private service: OpenAiService) {
    this.service.getDataFromOpenAI(this.text);
  }

}
