import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CardModel } from '../models/card-model';
import { ApiService } from '../services/api.service';
import { OpenAiService } from '../services/open-ai.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  cards !: CardModel[];
  filteredCards : CardModel[] = [];
  myForm !: FormGroup;
  
  constructor(private openAiService: OpenAiService, private ApiService: ApiService, private route: Router, private fb: FormBuilder) {
    if (this.route.url === "/"){
      this.cards = this.openAiService.cards;
    } else if (this.route.url === "/history"){
      this.ApiService.getCards()
      .subscribe(data => {
        this.cards=data;
       })   
     }
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      min: ['0' ],
      max: ['4'],
    });
  }

  getRoute() {
    return this.route;
  }

  sortByAscPrice() {
    this.cards.sort(function (first, second) {
      return first.budget - second.budget;
    });
    if(this.filteredCards.length > 0) {
      this.filteredCards.sort(function (first, second) {
        return first.budget - second.budget;
      });
    }
  }

  sortByDescPrice() {
    this.cards.sort(function (first, second) {
      return second.budget - first.budget;
    });
    if(this.filteredCards.length > 0) {
      this.filteredCards.sort(function (first, second) {
        return second.budget - first.budget;
      });
    }
  }

  filterByBudget(cards: CardModel[]): CardModel[] {
    let datas = [];
    datas = this.myForm.value;
    let min = datas['min'];
    let max = datas['max'];
    this.filteredCards = cards.filter(card => card.budget < max && card.budget > min);
    return this.filteredCards;
  }

  reset() {
    this.filteredCards = [];
  }
}

