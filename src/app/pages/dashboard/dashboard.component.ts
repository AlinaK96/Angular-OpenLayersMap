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
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  map: Map = new Map;
  mapCenter: number[] = [86.089506, 55.354927];

  // rotationAngle:number = 198
  // radius: number = 35   55.346727, 86.190531
  // latitude = 86.190531
  // longitude = 55.346727
  latitude = 86.085455
  longitude = 55.356324
  iconCoord: number[] = [this.latitude, this.longitude]



  iconFeature: Feature = new Feature({
    geometry: new Point(fromLonLat(this.iconCoord)),
    center: 10,
  });

  iconVectorSource:VectorSource = new VectorSource({
    features: []
  });

  iconVectorLayer = new VectorLayer({
    source: this.iconVectorSource
  });

  iconPinStyle: Style = new Style({
    image: new Icon({
      src: '../../../assets/pin.svg',
    })
  });


  ngOnInit(): void {
    this.MapInitialize()
    this.changeMaps()
    this.addSinglePin(this.iconCoord[0], this.iconCoord[1]);
  }

  MapInitialize(): void {
    this.map = new Map({
      view: new View({
        center: fromLonLat(this.mapCenter),
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
        self.addPinOnClick(event.coordinate[0], event.coordinate[1]);
    });

  }

  changeMaps(): void {
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
  
  addSinglePin(horizontal: number, vertical: number): void {
    this.map.addLayer(this.iconVectorLayer);
    this.iconFeature.setStyle(this.iconPinStyle);
    this.iconVectorSource.addFeature(this.iconFeature);

    this.iconFeature = new Feature({
      geometry: new Point([horizontal, vertical])
    });
  }

  addPinOnClick(horizontal: number, vertical: number): void{
    this.iconVectorSource.refresh();
    this.iconFeature = new Feature({
      geometry: new Point([horizontal, vertical])
    });

    this.iconFeature.setStyle(this.iconPinStyle);
    this.iconVectorSource.addFeature(this.iconFeature);
  }



 // GetCoord(): void{
    // console.log('lat1' + this.latitude);
    // console.log('lon1' +this.longitude);

    // this.latitude = this.latitude + this.radius * Math.cos(this.rotationAngle)
    // this.longitude = this.longitude + this.radius * Math.sin(this.rotationAngle)
    // //this.iconCoord= [this.latitude, this.longitude]
    
    // console.log('lat new' + this.latitude);
    // console.log('lon new' +this.longitude);
    // console.log(this.rotationAngle);
    // console.log(this.radius);
    //this.addSinglePin(this.latitude, this.longitude)
  //}

}

