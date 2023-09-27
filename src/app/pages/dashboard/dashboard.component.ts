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
import { CoordService } from 'src/app/shared/coords.service';

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
  constructor (private coordinates: CoordService){}

  map: Map = new Map;
  mapCenter: number[] = [86.088051, 55.354789];
  context: any; 
  container: any; 

  Iconlatitude = 86.088051
  Iconlongitude = 55.354789
  iconCoord: number[] = [this.Iconlatitude, this.Iconlongitude]

  radius: number = 50
  angle: number = 0
  x: number = 0
  y: number = 0



  ngOnInit(): void {
    this.MapInitialize()
    this.changeMaps()
    this.circle()
  }
  
  /* icon feature */
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

  /* functions */

  circle(): void{
    let currentAngle = 0; 
    let Radius = this.radius;
    let baseX = 100;
    let baseY = 100; 
    this.container = document.createElement("canvas");
    this.container.width = 200; 
    this.container.height = 200; 

  
    document.body.appendChild(this.container); 
    this.context = this.container.getContext('2d');

    this.context.fillStyle = '#f7f6f1'; 
    this.context.fillRect(0, 0, this.container.width, this.container.height); 
  
    setInterval(() =>{   
      
       this.context.fillStyle = '#f7f6f1';
       this.context.fillRect(0, 0, this.container.width, this.container.height);
  
       let vx = Math.cos(currentAngle)*Radius;
       let vy = Math.sin(currentAngle)*Radius;
       
       this.context.fillStyle = '#0f766e';
       this.context.fillRect(baseX+vx, baseY+vy, 15, 15);
       currentAngle+=0.1;
  
       }, 100)
  }

  MapInitialize(): void {
    this.map = new Map({
      view: new View({
        center: fromLonLat(this.mapCenter),
        zoom: 17,
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
      self.addPin(event.coordinate[0], event.coordinate[1]);
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
  

  addPin(latitude: number, longtitude: number): void{
    this.iconVectorSource.refresh();
    this.iconFeature = new Feature({
      geometry: new Point([latitude, longtitude])
    });

    this.iconFeature.setStyle(this.iconPinStyle);
    this.iconVectorSource.addFeature(this.iconFeature);
  }

  

  calc(angle: number):void{
    this.x = this.Iconlatitude + this.radius * Math.cos(angle)
    this.y = this.Iconlongitude + this.radius * Math.sin(angle)
  }

    pinRotation = setInterval( ()=>{
      this.angle = this.angle + 12
      if (this.angle > 360){
        this.angle = 0
      } else {
        this.calc(this.angle)
        
      }      
    }, 5000)

}
