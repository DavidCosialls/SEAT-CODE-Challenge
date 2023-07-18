import { Component, OnInit } from '@angular/core';
import { APIRequests } from './services/api-request.service';
import { DigimonModel } from './interfaces/digimon.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SEATCODE-challenge';

  constructor(private apiRequest: APIRequests, private router: Router){}

  ngOnInit(): void {
    console.log("hOLA")
  }

 

  

}
