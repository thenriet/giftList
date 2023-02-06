import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { filter, from, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CardModel } from '../models/card-model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class OpenAiService {

  readonly configuration = new Configuration({
    apiKey: environment.openAIToken
  });
  readonly openai = new OpenAIApi(this.configuration);
  card !: CardModel;
  cards : CardModel[] = [];
  cardsInDB !: CardModel[];

  constructor(private ApiService: ApiService) { 
    this.refreshCards();
  }

  async getDataFromOpenAI(text: string) {
    from(this.openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      max_tokens: 2000,
      temperature: 0.65,
      stream: false,
      stop: 'human'
    })).pipe(
      filter(resp => !!resp && !!resp.data),
      map(resp => resp.data),
      filter((data: any) => data.choices && data.choices.length > 0 && data.choices[0].text),
      map(data => data.choices[0].text)
    ).subscribe(async data => {
        const json = JSON.parse(data);
        for (let i = 0; i < json.length; i++) {
          let responseImage = await this.openai.createImage({
            prompt: json[i].description,
            n: 1,
            size: "256x256",
          });
          this.card = new CardModel();
          this.card.id = this.cardsInDB.length+1;
          this.card.title = json[i].name;
          this.card.description = json[i].description;
          this.card.isVisible = true;
          let image_url = responseImage.data.data[0].url;
          this.card.image = `${image_url}`;
          this.card.budget = json[i].budget;
          this.createCards(this.card);
          console.log(this.card);
          this.refreshCards();
        }
    });
  }

  refreshCards() {
    this.ApiService.getCards()
       .subscribe(data => {
         this.cardsInDB=data;
        })   
  }

  createCards(card : CardModel){
    this.cards.push(card);
    this.ApiService.addCard(card)
    .subscribe(data => {
      this.card=data;
    })    
  }
}
