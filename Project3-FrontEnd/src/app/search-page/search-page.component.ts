import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  
  
  formGroup = this.fb.group({
    genre: new FormControl(null, [Validators.required])
  })

  ngOnInit(): void {
  }

  RAWGData: any = []
  processForm(){
    if(this.formGroup.value.genre == ""){
      console.log("Dont break")
    } else {
      var body = {
        genre: this.formGroup.value.genre
      }
      this.formGroup.reset

      let rawgCall = new Promise((resolve, reject) => {
        this.http.post("RAWGCall", body)
        .toPromise()
        .then(
          res => {
            this.RAWGData = res
            resolve(res)
          },
          msg=>{
            reject(msg)
          }
        )
      })  
    }
  }

}
