import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import { RecPageComponent } from './rec-page/rec-page.component';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { VideogameCardComponent } from './videogame-card/videogame-card.component';
import {MatSidenavModule} from '@angular/material/sidenav';





@NgModule({
  declarations: [
    HomePageComponent,
    SearchPageComponent,
    MenuComponent,
    RecPageComponent,
    VideogameCardComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatRippleModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [MenuComponent]
})
export class AppModule { }
