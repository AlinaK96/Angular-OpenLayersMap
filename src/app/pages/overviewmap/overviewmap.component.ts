
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { DragRotateAndZoom, defaults as defaultInteractions} from 'ol/interaction.js';
import {OverviewMap, defaults as defaultControls} from 'ol/control.js';

import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent
  ],
  templateUrl: './overviewmap.component.html',
  styleUrls: ['./overviewmap.component.scss']
})

export class OverviewmapComponent implements OnInit {
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
        
        target: 'ol-overview'
      });
  }

}
