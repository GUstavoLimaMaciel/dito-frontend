import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { EventosService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule
  ],
  providers: [HttpClientModule,EventosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
