import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigimonModel } from 'src/app/interfaces/digimon.model';
import { DigimonsService } from 'src/app/services/digimons.service';
import { DigimonStore } from 'src/app/state/store';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  noDigimonsInTheTeam = false
  nickname = ""

  constructor(public digimonsService: DigimonsService, private digimonStore: DigimonStore, private router: Router) { }

  ngOnInit(): void {
    if (!this.digimonsService.TeamAlreadyLoaded){this.digimonsService.loadTeam()}
  }

  navigateToList(): void {
    this.router.navigate(["digimonList"])
  }

  setNickname(name: string, digimon: DigimonModel): void {
    this.digimonStore.setNewNickname(digimon, name)
  }
  deleteDigimon(digimon: DigimonModel): void {
    this.digimonStore.toogleSelectedDigimon(digimon).then((resp) => {
      console.log("Deleted")
    }) 
  }

}
