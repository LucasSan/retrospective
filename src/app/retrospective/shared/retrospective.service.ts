import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cards } from './model/retrospective.model';
import { Sprints } from './model/sprints.model';

@Injectable()
export class RetrospectiveService {

    constructor(private http: HttpClient) { }

    getCards(sprintCode?: string): any {
        return this.http.get<any>(`http://localhost:3002/api/cards?sprint=${sprintCode}`);
    }

    getSprints(): any {
        return this.http.get<Sprints>(`http://localhost:3002/api/sprints`);
    }

    saveCard(model: Cards) {
        return this.http.post<Cards>(`http://localhost:3002/api/cards`, model);
    }

    saveSprint(model: Sprints) {
        return this.http.post<Sprints>(`http://localhost:3002/api/sprints`, model);
    }

    updateCard(model: Cards) {
        return this.http.put<Cards>(`http://localhost:3002/api/cards/${model.code}`, model);
    }

    deleteCard(model: Cards) {
        return this.http.put<Cards>(`http://localhost:3002/api/cards/${model.code}`, model);
    }
}
