import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rec-page3',
  templateUrl: './rec-page3.component.html',
  styleUrls: ['./rec-page3.component.scss']
})
export class RecPage3Component implements OnInit {

  constructor(private fb: FormBuilder) { }

  formGroup = this.fb.group({
    key: new FormControl(null),
    
  })

  ngOnInit(): void {
  }

  processForm(){

  }

}
