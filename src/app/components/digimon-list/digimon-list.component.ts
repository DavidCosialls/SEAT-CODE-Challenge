import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { filter, switchMap, take } from 'rxjs';
import { DigimonModel } from 'src/app/interfaces/digimon.model';
import { APIRequests } from 'src/app/services/api-request.service';
import { DigimonQuery } from 'src/app/state/query';
import { DigimonStore } from 'src/app/state/store';


@Component({
  selector: 'app-digimon-list',
  templateUrl: './digimon-list.component.html',
  styleUrls: ['./digimon-list.component.scss']
})
export class DigimonListComponent implements OnInit{
  digimons: DigimonModel[] = []
  digimonsLength: number[] = []

  loading = false

  constructor(private apiRequest: APIRequests,
    private digimonQuery: DigimonQuery,
    private digimonStore: DigimonStore){}

  ngOnInit(): void {
    this.tableLoading()
  }

  tableLoading(): void {
    this.digimonQuery.getIsLoading().subscribe(loading => {
      console.log("loading", loading)
      this.loading = loading
    })
    this.digimonQuery.getDigimons().subscribe(digimons => {
      console.log("DIGIMON SUBSCRIPTION", digimons)
      this.digimons = digimons
    })
    this.digimonQuery.getIsLoading().pipe(
      take(1),
      filter(resp => !resp),
      switchMap(() => {
        this.digimonStore.setLoading(true)
        return this.apiRequest.getDigimons()
      })
    ).subscribe((resp) => {
      this.digimonStore.update(state => {
        console.log(resp)
        if (resp != undefined){
          this.digimonsLength = Array.from({ length: Math.ceil(resp.length / 3) }, (_, i) => i);
          return{
            digimonList: resp,
            isLoaded: true
          }
        }
        return {
          digimonList: []
        }
      })
      this.digimonStore.setLoading(false)
    }, (error) => {
      console.error(error);
      this.digimonStore.setLoading(false)
    })
  }

  selectedDigimon(digimon: DigimonModel): void {
    const selected = this.digimons.filter((digimonFilter) => digimonFilter.selected)
    if (selected.length == 6 && !digimon.selected){
      alert("You have choosen the max num of Digimons for your Team")
    }else{
      this.digimonStore.toogleSelectedDigimon(digimon).then((resp) => {
        if (resp){
          this.tableLoading()
        } 
      })
    }
    
  
  }

  
}