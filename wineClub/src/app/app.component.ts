import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wineClub';
  userId = localStorage.getItem('userId');
  name = localStorage.getItem('userName');
}

