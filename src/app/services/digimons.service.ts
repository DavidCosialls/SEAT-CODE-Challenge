import { Injectable } from "@angular/core";
import { DigimonModel } from "../interfaces/digimon.model";

@Injectable({
    providedIn: 'root'
})
export class DigimonsService {
    DigimonsTeam: DigimonModel[] = []

    insertDigimons(digimon: DigimonModel): void{
        if (this.DigimonsTeam.length<7){
            let index = this.DigimonsTeam.findIndex((digimonInside) => digimonInside.img == digimon.img)
            if (index != -1){
                alert("This digimon is already in your Team")
            }else{
                this.DigimonsTeam.push(digimon)
            }
        }else{
            alert("Your Team is full, please remove one Digimon before adding a new one")
        }
    }

    deleteDigimons(digimon: DigimonModel): void{
        let index = this.DigimonsTeam.findIndex((digimonInside) => digimonInside.img == digimon.img)
        if (index != -1){
            this.DigimonsTeam.splice(index, 1)
        }
    }

    setNicknameToDigimon(digimon: DigimonModel, nickname: string){
        let index = this.DigimonsTeam.findIndex((digimonInside) => digimonInside.img == digimon.img)
        if (index != -1){
            this.DigimonsTeam[index].name = nickname
            alert(`Digimon nickName updated to: ${nickname}`)
        }
    }
}