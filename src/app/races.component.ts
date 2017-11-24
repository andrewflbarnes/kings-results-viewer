import { Component } from '@angular/core';
import { OnInit, OnDestroy, } from '@angular/core';
import { Race } from './race';
import { RaceService } from './race.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subscription } from 'rxjs/Rx';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

@Component({
  selector: 'my-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {

  constructor(
    private raceService: RaceService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  races: Race[];
  set: string;
  league: string;
  timerSubscription: Subscription;
  raceSubscription: Subscription;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.league = params.get('league');
      this.set = params.get('set');
    });

    this.refreshData();
    this.raceSubscription = this.raceService.races$.subscribe(races => {
      this.races = races.filter(race => race.league == this.league && race.set == this.set);
    });

    let timer = Observable.timer(5000, 5000);
    this.timerSubscription = timer.subscribe(t => {
      this.refreshData();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  refreshData(): void {
    this.raceService.updateRaces();
  }

  onSelect(race: Race): void {
    this.router.navigate(['/detail', race.raceId]);
  }

  goBack(): void {
    this.location.back();
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
