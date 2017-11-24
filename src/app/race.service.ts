import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Race } from './race';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class RaceService implements OnInit{
    private url: string = 'http://kingsski.club/races/';
    public races$: BehaviorSubject<Race[]> = new BehaviorSubject([]);

    constructor(
        private http: Http
    ) { }

    ngOnInit(): void {
        this.updateRaces();
    }

    updateRaces(): void {
        let races = this.http.get(this.url)
            .map(res => res.json())
            .subscribe(races => this.races$.next(races));
    }

    getRace(id: number): Observable<Race> {
        return this.http.get(this.url)
            .map(res => res.json())
            .map((races: Race[]) => races.find((race: Race) => race.raceId === id));
    }
}
