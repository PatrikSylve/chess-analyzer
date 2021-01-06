import { Injectable, EventEmitter } from '@angular/core';
import { UserGames, DataService, GameResponse, Game } from './data.service'
import * as Chess from 'chess.js';
import * as pgnParser from 'pgn-parser';
import { StatsService } from './stats.service';
@Injectable({
  providedIn: 'root'
})


export class BoardService {

  games: Game[] = [];
  selectedGame: Game | undefined;
  loading: boolean = false;

  // Holds the loaded pgn 
  chessContainer: any;
  // Holds current state (feeds on container)
  chessState: any;
  moves: string[] = [];

  $selectedChanged: EventEmitter<any> = new EventEmitter();
  $positionChanged: EventEmitter<string> = new EventEmitter();

  constructor(private dataService: DataService, private statsService: StatsService) {
  }

  selectGame(game: Game) {
    this.selectedGame = game;
    this.moves = this.statsService.fenList[this.games.indexOf(game)].fen;
    this.statsService.firstMove();
    this.$selectedChanged.next();
  }

  selectGameByIndex(index) {
    this.selectGame(this.games[index]);
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
      this.statsService.addGames(this.games);
      this.selectGame(this.games[0]);
    }).catch(e => {
      console.error(e);
    }).finally(() => {
      this.loading = false;
    })
  }
}
