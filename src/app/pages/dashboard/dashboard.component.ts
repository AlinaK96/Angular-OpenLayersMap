import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import { fromLonLat } from 'ol/proj';
import { List } from 'src/app/interfaces/list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'Map Viewer - Openlayers & Angular'; 
  name = localStorage.getItem('Username')
  map: Map = new Map;

  listItems: List[] = [
    {
      name: 'Базовая карта',
      link: 'https://tailwindcss.com/docs'
    },
    {
      name: 'Регулирование прозрачности',
      link: 'https://tailwindcss.com/docs'
    },
    {
      name: 'Карта дорог разных стилей',
      link: 'https://tailwindcss.com/docs'
    },
    {
      name: 'Тур по карте',
      link: 'https://tailwindcss.com/docs'
    },
    {
      name: 'Движение на карте',
      link: 'https://tailwindcss.com/docs'
    },
  ]

  ngOnInit(): void {
    this.map = new Map({
      view: new View({
        center : fromLonLat([ 86.0833 ,  55.3333]),
        zoom: 12,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        
      ],
      target: 'ol-map'
    });
  }
}
