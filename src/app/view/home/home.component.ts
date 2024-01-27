import { Component } from '@angular/core';
import { SharedComponents } from '../../shared';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedComponents],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
