import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

import { HeaderComponent } from 'src/app/components/header/header.component';
import {ModalComponent} from 'src/app/components/modal/modal.component'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ModalComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  map: Map = new Map;

  ngOnInit(): void {
    this.MapInitialize()
  }

  MapInitialize() {
    this.map = new Map({
      view: new View({
        center : fromLonLat([ 86.0833 ,  55.3333]),
        zoom: 12,
        minZoom: 4
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      
      target: 'ol-map'
    });

    this.map.on('click', function(e){
      localStorage.setItem('CoordX', JSON.stringify(Math.round(e.coordinate[0])))
      localStorage.setItem('CoordY', JSON.stringify(Math.round(e.coordinate[1])))
    })
  }
}

