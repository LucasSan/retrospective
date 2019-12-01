import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cards } from './model/retrospective.model';

@Injectable()
export class RetrospectiveService {

    constructor(private http: HttpClient) { }

    getCards(): any {
        return this.http.get<any>(`http://localhost:3002/api/cards`);
    }

    saveCard(model: Cards) {
        return this.http.post<Cards>(`http://localhost:3002/api/cards`, model);
    }

    deleteCard(model: Cards) {
        return this.http.put<Cards>(`http://localhost:3002/api/cards/${model.code}`, model);
    }
}
