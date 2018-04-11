import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import{LoginPage}from '../login/login';

import { AngularFireDatabase ,AngularFireList  } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { NeedingPage } from '../needing/needing';
import *as firebase from 'firebase';
import { AlertController } from 'ionic-angular';


import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-addneeding',
  templateUrl: 'addneeding.html',
})
export class AddneedingPage {
  
  peoplelist: AngularFireList<any>;
  uid;
  constructor(private fire:AngularFireAuth ,public navCtrl: NavController, public navParams: NavParams, public af:AngularFireDatabase,private alertCtrl: AlertController) {

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
    let prompt = this.alertCtrl.create({
      title: 'رجاءا قم بمليء جميع الادخالات',
     
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            if ((data.firstname =="") && (data.lastname =="") && (data.address=="") && (data.phone=="") &&(data.infor=="")) {
              setTimeout(() => {
								this.showAlert('Nome vazio','Por favor, preencha o campo de nome.');
							}, 1000);
            }

    
           else {
             this.peoplelist.push({
            key_id: new Date().getTime(),
              firstname :data.firstname ,
                lastname :data.lastname,
                address:data.address,
                phone : data.phone,
                infor:data.infor,
                addBy:this.uid ,
                hide:0     
                  
                }).then(data => {
        
                  this.navCtrl.push( NeedingPage);
      
                });
                this.showAlert('Sucesso!','Jogador adicionado.');  
                  }
                  
                }
              }
            ]
            
          });
          
          prompt.present();
        }
        
        showAlert(title, subTitle) {
          let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
          });
          alert.present();
        }
  
  
  // createDevice(firstname,lastname, address,phone,infor){
  //   this.peoplelist.push({
  //     key_id: new Date().getTime(),
  //       firstname :firstname ,
  //         lastname :lastname,
  //         address:address,
  //         phone : phone,
  //         infor:infor,
  //         addBy:this.uid ,
  //         hide:0     
            
  //         }).then(newPerson => {
  
  //           this.navCtrl.push( NeedingPage);
  //         });
  // }

  


  goToMain(){
    this.navCtrl.push (HomePage)
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad AddneedingPage');
  }







}
