import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-videogame-card',
  templateUrl: './videogame-card.component.html',
  styleUrls: ['./videogame-card.component.scss']
})
export class VideogameCardComponent implements OnInit {

  constructor(private http: HttpClient) { }

  @Input() gameName:any
  @Input() gameCoverArt: any

  twitterArray: any = []
  valueToCheck = false
  buttonVal = true


  changeValue(){
    var body = {
      keyword: this.gameName
    }

    let twitterPromise = new Promise((resolve, reject) => {
      this.http.post("twitterCall", body)
        .toPromise()
        .then(
          res=>{  
            try{
              var resultArray = Object.entries(res)
              var grabText = resultArray[0][1]
              if(grabText.length < 5 && grabText.length > 0)
              {
                for(let i = 0; i < grabText.length; i++){
                  this.twitterArray.push(grabText[i]['text'])
                }
              }
              else{
                for(let i = 0; i < 5; i++){
                  this.twitterArray.push(grabText[i]['text'])
                }
              }
              this.valueToCheck = true
              this.buttonVal = false
              resolve(res)
            } catch (e) {
            }    
          },
          msg=>{
            reject(msg)
          }
        )

    })
  }

  ngOnInit(): void {
    
  }



}
