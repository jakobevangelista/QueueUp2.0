import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  
  formGroup = this.fb.group({
    genre: new FormControl(null, [Validators.required])
  })

  ngOnInit(): void {
  }

  processForm(){
    console.log(this.formGroup.value.genre)
  }

}
