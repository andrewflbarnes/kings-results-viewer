import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Race } from './race';
import { RaceService } from './race.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

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

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.league = params.get('league');
      this.set = params.get('set');
      this.getRaces();
    })
  }

  onSelect(race: Race): void {
    this.router.navigate(['/detail', race.raceId]);
  }

  getRaces(): void {
    this.raceService.getRaces().subscribe(races => {
      this.races = races.filter(race => race.league == this.league && race.set == this.set)
    });
  }

  goBack(): void {
    this.location.back();
  }
}
