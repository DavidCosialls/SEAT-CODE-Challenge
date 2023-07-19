import { Injectable } from "@angular/core";
import { DigimonModel } from "../interfaces/digimon.model";
import { APIRequests } from "./api-request.service";

@Injectable({
    providedIn: 'root'
})
export class DigimonsService {
    DigimonsTeam: DigimonModel[] = []
    TeamAlreadyLoaded: boolean = false
    noDigimonsInTheTeam = true
    constructor(private apiRequest: APIRequests){}

    insertDigimons(digimon: DigimonModel): void{
        this.noDigimonsInTheTeam = false
        if (this.DigimonsTeam.length<7){
            let index = this.DigimonsTeam.findIndex((digimonInside) => digimonInside.img == digimon.img)
            if (index != -1){
            }else{
                this.DigimonsTeam.push(digimon)
            }
        }
    }

    deleteDigimons(digimon: DigimonModel): void{
        let index = this.DigimonsTeam.findIndex((digimonInside) => digimonInside.img == digimon.img)
        if (index != -1){
            this.DigimonsTeam.splice(index, 1)
            if (this.DigimonsTeam.length == 0){
                this.noDigimonsInTheTeam = true
            }
        }
    }

    setNicknameToDigimon(digimon: DigimonModel, nickname: string){
        let index = this.DigimonsTeam.findIndex((digimonInside) => digimonInside.img == digimon.img)
        if (index != -1){
            this.DigimonsTeam[index].name = nickname
            alert(`Digimon nickName updated to: ${nickname}`)
        }
    }

    loadTeam(): void{
        if (!this.TeamAlreadyLoaded){
            this.apiRequest.getDigimons().forEach((digimons) => {
                digimons.forEach((digimon) => {
                    if (digimon.selected){
                        this.noDigimonsInTheTeam = false
                        this.insertDigimons(digimon)
                    }
                })
            })
            this.TeamAlreadyLoaded = true
        }
    }
}