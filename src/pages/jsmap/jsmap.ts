import { Component ,ViewChild ,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

declare var google;

@IonicPage()
@Component({
  selector: 'page-jsmap',
  templateUrl: 'jsmap.html',
})
export class JsmapPage {

  @ViewChild('map') mapElement:ElementRef;
  map: any;
   
    
  constructor(public navCtrl: NavController,
     public navParams: NavParams,private http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JsmapPage');
    this.loadMap();
  }
  loadMap() {
    let latLng = new google.maps.LatLng(33.937663,44.630127);
    
    let mapOptions = {
      center: latLng,
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);    
    
    var locations = [
      ['بعكوبة - دار الايتام - قرب مستشفى ديالى العام', 33.759684, 44.607975,3],
      ['الخالص - دار المسنين - قرب المحكمة', 33.843152, 44.522209, 4],
      ['  خانقين - مخيمات النازحين - قرب سدة الوند', 34.404077, 45.386353, 2],
      ['دلي عباس  - مخيم نازحين',34.013396, 44.869995, 1]
      
    ];
    
    var infowindow = new google.maps.InfoWindow();
    
    var marker, i;
    
    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map:this.map,
       
      });

     
    
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(this.map, marker);
        }
      })(marker, i));
    }
    }
   


}
