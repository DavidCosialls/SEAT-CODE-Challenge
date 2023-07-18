import { Query } from "@datorama/akita";
import { DigimonState, DigimonStore } from "./store";
import { Observable } from "rxjs";
import { DigimonModel } from "../interfaces/digimon.model";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class DigimonQuery extends Query<DigimonState>{
    constructor(private digimonStore: DigimonStore){
        super(digimonStore)
    }

    getDigimons(): Observable<DigimonModel[]> {
        return this.select(state => state.digimonList);
    }

    getLoaded(): Observable<boolean> {
        return this.select(state => state.isLoaded);
    }

    getIsLoading(): Observable<boolean> {
        return this.selectLoading();
    }

}