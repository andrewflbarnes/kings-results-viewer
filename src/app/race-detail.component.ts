import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Race } from './race';
import { RaceService } from './race.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'race-detail',
  templateUrl: './race-detail.component.html',
  styleUrls: [ './race-detail.component.css' ]
})
export class RaceDetailComponent implements OnInit {
  
    @Input() race: Race
  
    constructor(
      private raceService: RaceService,
      private route: ActivatedRoute,
      private location: Location
    ) { }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.raceService.getRace(+params.get('id')))
      .subscribe(race => this.race = race)
  }

  goBack(): void {
    this.location.back();
  }
}
