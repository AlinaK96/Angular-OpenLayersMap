import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

import { HeaderComponent } from 'src/app/components/header/header.component';
import XYZ from 'ol/source/XYZ';
import BingMaps from 'ol/source/BingMaps';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent
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
          opacity: 0
        }),
        new TileLayer({
          source: new XYZ({
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          }),
          opacity: 1
        }),
      ],
      
      target: 'ol-map'
    });
  }

}

