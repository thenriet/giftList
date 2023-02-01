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
    let query = `Donne moi une liste de 8 cadeaux pour une personne de ${age} ans, de sexe ${gender}, qui s'appelle ${firstname} et qui aime le ${interests}. J'ai besoin d'une description personnalisée avec le nom de la personne. Présente tout ça en un fichier JSON avec deux clés : name et description.`;

    let query1 = `Donne moi une liste de 8 idées de cadeaux adaptée selon l'âge, le sexe et surtout les intérêts d'une personne. La liste doit être en format JSON et contenir uniquement deux clés : name et description. La description doit contenir le nom de la personne et doit faire au moins 50 caractères.Chaque description doit être différente. Cette personne a ${age} ans, est de sexe ${gender}, s'appelle ${firstname} et a comme intérêts ${interests}.`;

    this.service.getDataFromOpenAI(query1);
  };
}
