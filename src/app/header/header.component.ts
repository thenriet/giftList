import { Component, OnInit } from '@angular/core';
import { OpenAiService } from '../services/open-ai.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardModel } from '../models/card-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  myForm !: FormGroup;
  card !: CardModel;

  constructor(private fb: FormBuilder, private service: OpenAiService, private route : Router) { }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      firstname: ['Thomas', [Validators.required],  ],
      age: ['4'],
      gender: ['masculin'],
      interests: ['batman, dinosaures et la neige', [Validators.required] ],
      budget: ['']
    });
  }

  onSubmit(): void {
    let datas = [];
    datas = this.myForm.value;
    let firstname = datas['firstname'];
    let age = datas['age'];
    let gender = datas['genre'];
    let interests = datas['interests'];
    let budget = null;
    if (datas['budget'] !== ''){
      budget = datas['budget'];
      let query2 = `Trouve-moi sur Amazon 4 cadeaux avec un budget proche de ${budget} euros adaptés à cette personne: ${firstname}, ${gender} de ${age} ans aimant ${interests}. Ne propose pas de cadeaux dangereux pour les enfants. La description de 50 caractères minimum contient le nom de la personne. Donne-moi cette liste en format json (contenant les clés : name, description et budget). N'affiche pas le budget dans la description.`;
      this.service.getDataFromOpenAI(query2);
    } else {
      let query2 = `Trouve-moi sur Amazon 4 cadeaux adaptés à cette personne: ${firstname}, ${gender} de ${age} ans aimant ${interests}. Ne propose pas de cadeaux dangereux pour les enfants. La description de 50 caractères minimum contient le nom de la personne. Donne-moi cette liste en format json (contenant les clés : name, description et budget). Le budget doit être en euros.`;
      this.service.getDataFromOpenAI(query2);
    }
  };

  getRoute(){
    return this.route;
  }
}
