import { Component, OnInit } from '@angular/core';
import { OpenAiService } from '../open-ai.service';
import { FormControl, FormGroup, FormBuilder, Validators, PatternValidator } from '@angular/forms';
import { CardModel } from '../models/card-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  myForm !: FormGroup;
  card !: CardModel;


  constructor(private fb: FormBuilder, private service: OpenAiService) { }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      firstname: ['Thomas', [Validators.required],  ],
      age: ['4'],
      gender: ['masculin'],
      interests: ['batman, dinosaures et la neige', [Validators.required] ],
    });
  }

  onSubmit(): void {
    let datas = [];
    datas = this.myForm.value;
    let firstname = datas['firstname'];
    let age = datas['age'];
    let gender = datas['genre'];
    let interests = datas['interests'];
    let budget = datas['budget'];
    if (budget !== ""){
      let query2 = `Donne-moi une liste en format json (contenant trois clés : name, description et budget) de 4 cadeaux adaptés à cette personne: ${firstname}, ${gender} de ${age} ans aimant ${interests}. les cadeaux doivent avoir un prix maximum de ${budget}. La description de 50 caractères minimum contient le nom de la personne.`;
      this.service.getDataFromOpenAI(query2);
    } else {
      let query2 = `Donne-moi une liste en format json (contenant deux clés : name et description) de 4 cadeaux adaptés à cette personne: ${firstname}, ${gender} de ${age} ans aimant ${interests}. La description de 50 caractères minimum contient le nom de la personne.`;
      this.service.getDataFromOpenAI(query2);
    }
  };
}
