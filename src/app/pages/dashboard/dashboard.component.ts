import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Map, View, Feature } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import { Point } from "ol/geom";


import { HeaderComponent } from 'src/app/components/header/header.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

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
  latitude = 86.089506
  longitude = 55.354927
  skytree = [this.latitude, this.longitude];

  iconFeature = new Feature({
    geometry: new Point(fromLonLat(this.skytree)),
    center: 10,
    
  });

  iconVectorSource = new VectorSource({
    features: []
  });

  iconVectorLayer = new VectorLayer({
    source: this.iconVectorSource
  });

  iconPinStyle = new Style({
    image: new Icon({
      src: '../../../assets/pin.svg',
    })
  });

  ngOnInit(): void {
    this.MapInitialize()
  }

  MapInitialize() {
    this.map = new Map({
      view: new View({
        center: fromLonLat(this.skytree),
        zoom: 14,
        minZoom: 10,
        maxZoom: 18,
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

    this.map.addLayer(this.iconVectorLayer);
    this.iconFeature.setStyle(this.iconPinStyle);
    this.iconVectorSource.addFeature(this.iconFeature);
    let self = this;

    this.map.on("click", function(event) {
        self.addSinglePin(event.coordinate[0], event.coordinate[1]);
    });

  }
  
  addSinglePin(horizontal: number, vertical: number): void {
    this.iconVectorSource.refresh();
    this.iconFeature = new Feature({
      geometry: new Point([horizontal, vertical])
    });

    this.iconFeature.setStyle(this.iconPinStyle);
    this.iconVectorSource.addFeature(this.iconFeature);

    
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

