import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { RaceService } from './race.service';
import { Race } from './race';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    races: Race[] = [];
    league: string;

    constructor(
        private raceService: RaceService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.league = params.get('league'))
            .subscribe(v => this.updateData());
        
        this.raceService.races$.subscribe(races => {
            this.races = races.filter(race => race.league == this.league && race.winner == null).slice(0, 4)
        });
        
        let timer = Observable.timer(5000, 5000)
        timer.subscribe(t => this.updateData());
    }

    updateData(): void {
        this.raceService.updateRaces();
    }
}