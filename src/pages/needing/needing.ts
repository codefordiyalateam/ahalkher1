import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../login/login';

import { AngularFireDatabase ,AngularFireList ,AngularFireAction } from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';


import { HomePage } from '../home/home';
import {AddneedingPage }  from  '../addneeding/addneeding';
import { ShowneedingPage }  from  '../showneeding/showneeding';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-needing',
  templateUrl: 'needing.html',
})
export class NeedingPage {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  userData :AngularFireList<any>;
  
  userid;
   

  constructor(private fire:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,public af:AngularFireDatabase) {
  
  
    this.itemsRef = af.list('/device')
      
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ 
        key: c.payload.key,
        firstname:c.payload.val().firstname,
        lastname:c.payload.val().lastname,
        address:c.payload.val().address,
        infor:c.payload.val().infor,
        phone:c.payload.val().phone,
        hide:c.payload.val().hide,
        addBy:c.payload.val().addBy
         })
      );
    });
    this.fire.authState.subscribe(auth =>{
      if (auth) {
        this.userid=auth.uid;
        console.log(auth);
      }
    })


  }

    itemSelected(key, firstname, lastname,address, phone,infor,addBy ){
    // console.log(key, firstname, lastname, address, phone, infor);
     this.navCtrl.push(ShowneedingPage,{
      key : key,
      firstname : firstname,
      lastname : lastname,
      address :address,    
      phone : phone ,
      infor:infor,
  
          }); 
    
      
        }









  goToMain(){
    this.navCtrl.push (HomePage)
  }

   goToAdd(){   
   
   this.navCtrl.push (LoginPage)

   }

  deleteMy(key){
    alert("ok")
    this. userData = this.af.list('/device')
      this.userData.update(key,{
        "hide":"1"
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NeedingPage');
  }
  
  delete(key){
    console.log(key);
  }
  


}
