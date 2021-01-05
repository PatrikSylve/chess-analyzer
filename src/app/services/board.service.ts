import { Injectable, EventEmitter } from '@angular/core';
import { UserGames, DataService, GameResponse, Game } from './data.service'
import * as chess from "chess.js";


@Injectable({
  providedIn: 'root'
})

export class BoardService {

  games: Game[] = [];
  selectedGame: Game | undefined;
  loading: boolean = false;

  $selectedChanged: EventEmitter<any> = new EventEmitter();;

  constructor(private dataService: DataService) { }

  selectGame(game: Game) {
    this.selectedGame = game;
    this.$selectedChanged.next();
  }

  getSelectedGame(): Game | undefined {
    return this.selectedGame;
  }

  next(direction: number = 1) {
    if (this.selectedGame) {
      let index = this.games.indexOf(this.selectedGame) + direction;
      if (index < 0) index = this.games.length - 1;
      if (index > this.games.length - 1) index = 0;
      this.selectGame(this.games[index]);
    }
  }

  fetchGames(user: UserGames) {
    this.loading = true;
    this.dataService.fetchGames(user).then(res => {
      return res.json();
    }).then(json => {
      this.games = json.games;
      this.selectGame(this.games[0]);
      console.log("Number of games found: ", this.games.length)
    }).catch(e => {
      console.error(e);
    }).finally(() => {
      this.loading = false;
    })
  }



}
