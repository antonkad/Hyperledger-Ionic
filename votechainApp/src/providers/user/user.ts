import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  candidates: any;


  constructor(private http: Http) {
    this.candidates = null;
  }

  getCandidates() {
    if (this.candidates) {
      return Promise.resolve(this.candidates);
    }

    return new Promise(resolve => {
      this.http.get('http://148.100.98.63:3000/api/org.votechain.candidat.Candidat')
        .map(res => res.json())
        .subscribe(data => {
          this.candidates = data;
          resolve(this.candidates);
        });
    });
  }





}
