import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import{LoginPage}from '../login/login';

import { AngularFireDatabase ,AngularFireList  } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { NeedingPage } from '../needing/needing';
import *as firebase from 'firebase';


import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-addneeding',
  templateUrl: 'addneeding.html',
})
export class AddneedingPage {
  
  peoplelist: AngularFireList<any>;
  uid;
  constructor(private fire:AngularFireAuth ,public navCtrl: NavController, public navParams: NavParams, public af:AngularFireDatabase) {

    this.peoplelist=af.list('/device');
   
    this.fire.auth.onAuthStateChanged(function(user){
      if(!user){
        navCtrl.setRoot(LoginPage);
      }
       console.log(user);
       });
       this.fire.authState.subscribe(auth =>{
        if (auth) {
          this.uid=auth.uid;
          console.log(auth);
        }
      })
  }


  createDevice(firstname,lastname, address,phone,infor){
    this.peoplelist.push({
      key_id: new Date().getTime(),
        firstname :firstname ,
          lastname :lastname,
          address:address,
          phone : phone,
          infor:infor,
          addBy:this.uid ,
          hide:0     
            
          }).then(newPerson => {
  
            this.navCtrl.push( NeedingPage);
          });
  }

  


  goToMain(){
    this.navCtrl.push (HomePage)
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad AddneedingPage');
  }







}
