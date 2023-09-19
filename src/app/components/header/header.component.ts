import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title:string = 'Map Viewer - Openlayers & Angular'; 
  name:string | null = localStorage.getItem('Username')

  constructor(private router: Router) { }

  goToProfile():void{
    this.router.navigate(['/profile']);
  }

  ExitProfile():void{
    this.router.navigate(['/']);
  }
}
