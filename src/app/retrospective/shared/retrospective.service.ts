import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RetrospectiveService {

    constructor(private http: HttpClient) { }

    getCards(): any {
        return this.http.get<any>(`http://localhost:3002/api/cards`);
    }

    saveCard(model: any) {
        return this.http.post<any>(`http://localhost:3002/api/cards`, model);
    }
}
