import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OpenAiService } from './services/open-ai.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'giftList';
  
}
