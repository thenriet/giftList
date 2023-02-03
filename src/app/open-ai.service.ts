import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { filter, from, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CardModel } from './models/card-model';

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

  constructor() { }

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
          this.card.title = json[i].name;
          this.card.description = json[i].description;
          let image_url = responseImage.data.data[0].url;
          this.card.image = `${image_url}`;
          this.createCards(this.card);
        }
    });
  }

  createCards(card : CardModel){
    this.cards.push(card);
    return this.cards;
  }


}
