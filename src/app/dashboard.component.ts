import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { RaceService } from './race.service';
import { Race } from './race';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    races: Race[] = [];
    league: string;
    timerSubscription: Subscription;
    raceSubscription: Subscription;

    constructor(
        private raceService: RaceService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => {
                return Observable.of(params.get('league'));
            })
            .subscribe((league: string) => {
                this.league = league;
                this.updateData()
            });

        this.raceSubscription = this.raceService.races$.subscribe(races => {
            this.races = races.filter(race => race.league == this.league && race.winner == null).slice(0, 4)
        });

        let timer = Observable.timer(5000, 5000)
        this.timerSubscription = timer.subscribe(t => {
            this.updateData();
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }

    updateData(): void {
        this.raceService.updateRaces();
    }

    unsubscribe(): void {
        if (this.raceSubscription != null) {
            this.raceSubscription.unsubscribe();
        }
        if (this.timerSubscription != null) {
            this.timerSubscription.unsubscribe();
        }
    }
}