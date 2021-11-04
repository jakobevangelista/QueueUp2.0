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


  twitterArray: string[] = []

  processForm(){
    var body = {
      keyword: "Valorant"
    }
    this.formGroup.reset
    this.twitterArray = []

    let twitterPromise = new Promise((resolve, reject) => {
      this.http.post("twitterCall", body)
        .toPromise()
        .then(
          res=>{
            var resultArray = Object.entries(res)
            var grabText = resultArray[0][1]
            for(let i = 0; i < 5; i++){
              this.twitterArray.push(grabText[i]['text'])
            }

            console.log(this.twitterArray[1])
            resolve(res)
          },
          msg=>{
            reject(msg)
          }
        )

    })



  }

}
