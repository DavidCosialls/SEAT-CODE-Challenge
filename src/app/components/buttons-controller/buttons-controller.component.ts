import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buttons-controller',
  templateUrl: './buttons-controller.component.html',
  styleUrls: ['./buttons-controller.component.scss']
})
export class ButtonsControllerComponent {
  constructor(private router: Router){}

  navigateToList(): void {
    this.router.navigate(['/digimonList'])
  }
}