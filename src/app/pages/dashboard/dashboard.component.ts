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
  Iconlatitude = 86.085455
  Iconlongitude = 55.356324
  iconCoord: number[] = [this.Iconlatitude, this.Iconlongitude]
  alpha: number = 2 * 3.14
  currentTime = Date.now()
  radius = 30

  ngOnInit(): void {
    this.MapInitialize()
    this.changeMaps()
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

  MapInitialize(): void {
    this.map = new Map({
      view: new View({
        center: fromLonLat(this.mapCenter),
        zoom: 23,
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
  
  // addSinglePin(horizontal: number, vertical: number): void {
  //   this.map.addLayer(this.iconVectorLayer);
  //   this.iconFeature.setStyle(this.iconPinStyle);
  //   this.iconVectorSource.addFeature(this.iconFeature);

  //   this.iconFeature = new Feature({
  //     geometry: new Point([horizontal, vertical])
  //   });
  // }

  addPinOnClick(horizontal: number, vertical: number): void{
    this.iconVectorSource.refresh();
    this.iconFeature = new Feature({
      geometry: new Point([horizontal, vertical])
    });

    this.iconFeature.setStyle(this.iconPinStyle);
    this.iconVectorSource.addFeature(this.iconFeature);
  }


  // calc(time:any){
  //   console.log('lat1' + this.Iconlatitude);
  //   console.log('lon1' +this.Iconlongitude);
  //   let start1 = this.Iconlatitude - this.radius * Math.cos(this.alpha * time)
  //   let start2 = this.Iconlongitude - this.radius * Math.sin(this.alpha * time)

  //   this.Iconlatitude = start1 + this.radius * Math.cos(this.alpha * time)
  //   this.Iconlongitude = start2 + this.radius * Math.sin(this.alpha * time)
  //   //x= x0 + raduis* Math.cos(alpha * time)

  //   console.log('new: ' + this.Iconlatitude, '+' + this.Iconlongitude);
  // }

  // startTime = setInterval( ()=>{
  //   let time = Date.now() - this.currentTime
  //   this.calc(time)
  // }, 10000)


  /* II */

  // calc(angle: number){
  //   console.log('lat1' + this.Iconlatitude);
  //   console.log('lon1' +this.Iconlongitude);

  //   this.Iconlatitude = this.radius * Math.cos(angle)
  //   this.Iconlongitude = this.radius * Math.sin(angle)

  //   console.log('new' + this.Iconlatitude, '/' + this.Iconlongitude);
    
  // }

  //   startTime = setInterval( ()=>{
  //     let angle = 180
  //     this.calc(angle)
  //   }, 5000)

}

