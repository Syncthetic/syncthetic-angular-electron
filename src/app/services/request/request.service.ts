
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient
  ) { }

  requestWithCredentials(url: string, responseType: any = 'text') {
    return this.http.get(url, { withCredentials: true, responseType: responseType }).toPromise()
  }

  send(url, data, responseType: any = 'text') {
    return this.http.post(url, data, { withCredentials: true, responseType: responseType }).toPromise()
  }
}