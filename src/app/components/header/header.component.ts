import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'Map Viewer - Openlayers & Angular'; 
  name = localStorage.getItem('Username')

  constructor(private router: Router) { }

  goToProfile(){
    this.router.navigate(['/profile']);
  }
}
