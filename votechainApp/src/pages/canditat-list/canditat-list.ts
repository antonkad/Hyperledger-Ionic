import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Candidat7Page } from '../candidat7/candidat7';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-canditat-list',
  templateUrl: 'canditat-list.html'
})
export class CanditatListPage {

  constructor(public navCtrl: NavController, public userProvider: UserProvider) {
  }
  goToCandidat7(params){
    if (!params) params = {};
    this.navCtrl.push(Candidat7Page);
  }
}
