import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
})

export class ModalComponent implements OnInit {
  coordX: any
  coordY: any

  ngOnInit(): void {
    this.getCoords()
  }

  getCoords(){
    this.coordX = localStorage.getItem('CoordX')
    this.coordY = localStorage.getItem('CoordY')
  }
  
}
