import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Race } from './race';
// import { RACES } from './mock-races';

@Injectable()
export class RaceService {
    private url: string = 'http://localhost:8080/races';

    constructor(
        private http: Http
    ) { }

    getRaces(): Observable<Race[]> {
        return this.http.get(this.url)
            .map(res => res.json());
    }

    getRace(id: number): Observable<Race> {
        return this.http.get(this.url)
            .map(res => res.json())
            .map((races: Race[]) => races.find((race: Race) => race.raceId === id));
    }
}
