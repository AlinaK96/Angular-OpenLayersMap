import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordService } from 'src/app/shared/coords.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit{

  constructor (public coordsService: CoordService){}
  radius: number = this.coordsService.radius

  ngOnInit(): void {
    
  }

  ChangeHandler() {
    this.coordsService.radius = this.radius
    this.coordsService.ChangeHandler()
  }

}
