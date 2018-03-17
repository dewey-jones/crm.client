import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IGame } from "./game";
import { GameService } from "./game.service";

@Component({
  selector: 'pm-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games: IGame[] = [];
  routeErrorMessage: string;
  gamesErrorMessage: string;
  
  constructor(private _gameService: GameService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      let seasonId = params['id'];
      this._gameService.getSeasonGames(seasonId)
        .subscribe(games => {
          this.games = games;
        },
        error => this.gamesErrorMessage = <any>error);
        console.log(seasonId);
    },
    error => this.routeErrorMessage = <any>error);
  }
}


