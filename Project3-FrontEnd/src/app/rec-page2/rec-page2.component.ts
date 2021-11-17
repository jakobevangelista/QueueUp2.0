import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rec-page2',
  templateUrl: './rec-page2.component.html',
  styleUrls: ['./rec-page2.component.scss']
})
export class RecPage2Component implements OnInit {

  constructor(private fb: FormBuilder) { }

  formGroup = this.fb.group({
    year: new FormControl(null),
    
  })

  processForm(){
    
  }

  ngOnInit(): void {
  }

}
