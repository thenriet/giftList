import { Component, OnInit } from '@angular/core';
import { OpenAiService } from '../open-ai.service';
import { FormControl, FormGroup, FormBuilder, Validators, PatternValidator } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  myForm !: FormGroup;

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
    console.log(interests);
    let query1 = `Donne-moi une liste de 4 cadeaux adaptés à cette personne: ${firstname}, ${gender} de ${age} ans aimant ${interests} en format json contenant deux clés : name (en 3 mots max en français) et description (de 50 caractères avec le nom de la personne).`;

    this.service.getDataFromOpenAI(query1);
  };
}
