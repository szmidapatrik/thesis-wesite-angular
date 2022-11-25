import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerstatsService {

  dataUrl: string = "http://localhost:3000/"

  constructor(private http: HttpClient) { }

  getClusters(dataSelector: string): Observable<any> {
    return this.http.get(`${this.dataUrl}${dataSelector}`)
  }

}
