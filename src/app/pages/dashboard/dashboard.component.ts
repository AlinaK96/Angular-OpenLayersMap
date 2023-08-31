import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';

import { HeaderComponent } from 'src/app/components/header/header.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { Overlay } from 'ol';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  map: Map = new Map;
  openstreetMap:Map = new Map;

  ngOnInit(): void {
    this.MapInitialize()
  }

  MapInitialize() {
    this.map = new Map({
      view: new View({
        center : fromLonLat([86.0833 ,55.3333]),
        zoom: 13,
        minZoom: 4
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
          visible: false,
          className: 'MapBase'
        }),
        new TileLayer({
          source: new OSM({
            url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
          }),
          visible: true,
          className: 'MapHumanitarian'
        }),
        new TileLayer({
          source: new OSM({
            url: 'https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}.png'
          }),
          visible: false,
          className: 'MapBlack'
        }),
        new TileLayer({
          source: new OSM({
            url: 'https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg'
          }),
          visible: false,
          className: 'MapStamen'
        }),
        new TileLayer({
          source: new OSM({
            url: 'https://cdn.lima-labs.com/{z}/{x}/{y}.png?api=demo'
          }),
          visible: false,
          className: 'MapRoadLines'
        }),
        new TileLayer({
          source: new OSM({
            url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png'
          }),
          visible: false,
          className: 'MapSepia'
        }),
        new TileLayer({
          source: new OSM({
            url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png'
          }),
          visible: false,
          className: 'MapDark'
        }),
        new TileLayer({
          source: new OSM({
            url: 'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}.png'
          }),
          visible: false,
          className: 'MapDistrict'
        }),
      ],
      
      target: 'ol-map'
    });
    
    const LayerElements = (document.querySelectorAll('.labelType > input[type=radio]'))
    let LayerElementArray = Array.from(LayerElements)

    for (let elem of LayerElementArray){
      elem.addEventListener('change', () =>{
        const LayerRadioButton = elem.id;
        this.map.getLayers().forEach(function(element, index, array){
          const BaseLayerTitle = element.getClassName();
          element.setVisible(BaseLayerTitle === LayerRadioButton)
        });
        
      })
    }

  }

}

