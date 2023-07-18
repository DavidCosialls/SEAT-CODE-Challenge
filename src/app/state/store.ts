import { Store, StoreConfig } from '@datorama/akita'
import { DigimonModel } from '../interfaces/digimon.model'
import { Injectable } from '@angular/core';
import { APIRequests } from '../services/api-request.service';
import { DigimonsService } from '../services/digimons.service';

export interface DigimonState {
    digimonList: DigimonModel[];
    isLoaded: boolean;
}

export const getInitialState = () => {
    return {
        digimonList: [],
        isLoaded: false
    }
}

@Injectable({
    providedIn: 'root'
})
@StoreConfig({name: 'DigimonTeam'})
export class DigimonStore extends Store<DigimonState> {
    constructor(private apiRequest: APIRequests, private digimonsService: DigimonsService){
        super(getInitialState())
    }

    toogleSelectedDigimon(digimon: DigimonModel): Promise<boolean>{
        const digimonCopy = Object.assign({}, digimon); 
        digimonCopy.selected = !digimon.selected
        if (digimonCopy.selected){
            this.digimonsService.insertDigimons(digimonCopy)
        }else{
            this.digimonsService.deleteDigimons(digimonCopy)
        }

        return new Promise<boolean>((resolve) => {
            this.apiRequest.updateDigimons(digimonCopy).subscribe(() => {
                this.update(state => {
                    const digimons = [...state.digimonList]
                    let index = state.digimonList.findIndex((digimonIndex) => digimonIndex.img == digimon.img)
                    if (index != -1){
                        digimons[index] = {
                            ...digimons[index],
                            selected: !digimon.selected
                        }
                    }
                    resolve(true)
                    return{
                        digimonList: digimons,
                        isLoaded: true
                    };
                })
            })
        })
    }

    setNewNickname(digimon: DigimonModel, nickName: string): Promise<boolean>{
        const digimonCopy = Object.assign({}, digimon); 
        digimonCopy.name = nickName
        return new Promise<boolean>((resolve) => {
            this.apiRequest.updateDigimons(digimonCopy).subscribe(() => {
                this.update(state => {
                    const digimons = [...state.digimonList]
                    let index = state.digimonList.findIndex((digimonIndex) => digimonIndex.id == digimon.id)
                    if (index != -1){
                        digimons[index] = {
                            ...digimons[index],
                            name: nickName
                        }
                    }
                    resolve(true)
                    return{
                        digimonList: digimons,
                        isLoaded: true
                    };
                })
            })
        })
    }
    
}