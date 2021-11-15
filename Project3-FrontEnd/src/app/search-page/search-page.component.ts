import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient, private _snackBar: MatSnackBar) { }
  
  
  formGroup = this.fb.group({
    genre: new FormControl(null, [Validators.required])
  })

  ngOnInit(): void {
  }


  RAWGData: any = []
  IGDBData: any = []
  processForm(){
    this.RAWGData = []
    this.IGDBData = []
    if(this.formGroup.value.genre == null){
      this._snackBar.open("Please enter a input field", "Close")
    } else {
      var bodyRAWG = {
        genre: this.formGroup.value.genre.toLowerCase()
      }
      var bodyIGDB = {
        genre: this.formGroup.value.genre
      }
      this.formGroup.reset
      
      let rawgOff = false
      let igdbOff = false
      if(this.formGroup.value.genre == "Point-and-click" || this.formGroup.value.genre == "Simulator"
       || this.formGroup.value.genre == "Tactical" || this.formGroup.value.genre == "MOBA" || this.formGroup.value.genre == "Sport"){
        rawgOff = true
      }

      if(this.formGroup.value.genre == "Puzzle" || this.formGroup.value.genre == "Role-playing-games-rpg" || this.formGroup.value.genre == "Family" || this.formGroup.value.genre == "Platformer"){
        igdbOff = true
      }
      


      if(!rawgOff){
        let rawgCall = new Promise((resolve, reject) => {
          this.http.post("RAWGCall", bodyRAWG)
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
      if(!igdbOff){
        let IGDBCall = new Promise((resolve, reject) => {
          this.http.post("IGDBCall", bodyIGDB)
          .toPromise()
          .then(
            res => {
              this.IGDBData = res
              resolve(res)
            },
            msg => {
              reject(msg)
            }
          )
        })
      }
    }
  }

}
