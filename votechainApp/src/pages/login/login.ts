import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CanditatListPage } from '../canditat-list/canditat-list';
import { Candidat7Page } from '../candidat7/candidat7';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {
  }
  goToCanditatList(params){
    if (!params) params = {};
    this.navCtrl.push(CanditatListPage);
  }goToCandidat7(params){
    if (!params) params = {};
    this.navCtrl.push(Candidat7Page);
  }
}
