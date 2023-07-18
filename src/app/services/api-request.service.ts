import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, filter, map } from "rxjs";
import { DigimonModel } from "../interfaces/digimon.model";

@Injectable({
    providedIn: 'root'
})
export class APIRequests {
    id = 1
    digimonAPI = "https://digimon-api.vercel.app/api/digimon"
    digimonLocalAPI = "http://localhost:3000/digimons"

    constructor(private http: HttpClient){}
   
    getDigimons(): Observable<DigimonModel[]> {
        return this.http.get<DigimonModel[]>(`${this.digimonLocalAPI}`)
        .pipe(map((resp)=> resp))
        
    }
    addDigimon(digimon: DigimonModel): Observable<DigimonModel[]> {
        return this.http.post<DigimonModel[]>(`${this.digimonLocalAPI}`, digimon);
    }

    deleteTodo(digimon: DigimonModel): Observable<DigimonModel[]> {
        return this.http.delete<DigimonModel[]>(`${this.digimonLocalAPI}/${digimon.id}`)
    }

    updateDigimons(digimon: DigimonModel): Observable<DigimonModel> {
        return this.http.put<DigimonModel>(`${this.digimonLocalAPI}/${digimon.id}`, digimon);
               
    }

    transformToJson(response: string): object[] {
        return JSON.parse(response)
    }

}

export interface TotalEntriesModel {
    count: Number,
    entries: EntriesModel[]
}

export interface EntriesModel {
    API: string,
    Auth: string,
    Category: string,
    Cors: string,
    Description: string,
    HTTPS: Boolean,
    Link: string
}

