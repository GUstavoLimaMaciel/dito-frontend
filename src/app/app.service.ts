import {Injectable, Input} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'


@Injectable()
export class EventosService{

  constructor(private http: HttpClient){}

    listarEventos(): Observable<any>{
        return this.http.get(`https://storage.googleapis.com/dito-questions/events.json`)
        .pipe();
    }
}