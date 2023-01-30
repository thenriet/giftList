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
      firstname: ['Geralt', [Validators.required],  ],
      lastname: ['De Riv',  [Validators.required] ],
      age: ['67'],
      genre: ['Homme'],
      type: ['customer', [Validators.required] ],
    });
  }
}
