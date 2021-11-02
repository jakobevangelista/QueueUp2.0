import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import { RecPageComponent } from './rec-page/rec-page.component';


@NgModule({
  declarations: [
    HomePageComponent,
    SearchPageComponent,
    MenuComponent,
    RecPageComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [MenuComponent]
})
export class AppModule { }
