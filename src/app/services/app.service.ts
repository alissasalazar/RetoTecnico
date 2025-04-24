import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroments.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })

  export class AppService {
    private apiUrl = environment.apiUrl 

    constructor(private http: HttpClient) { }


    getDto(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}`  +'?results=10&exc=login,registered,phone,cell,id,nat' )
      }
  }