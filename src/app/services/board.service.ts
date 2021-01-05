import { Injectable, EventEmitter } from '@angular/core';
import { UserGames, DataService, GameResponse, Game } from './data.service'
import * as Chess from 'chess.js';
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

  $selectedChanged: EventEmitter<any> = new EventEmitter();;

  constructor(private dataService: DataService) { }

  selectGame(game: Game) {
    this.selectedGame = game;
    this.generateFen();
    this.$selectedChanged.next();
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

  generateFen() {
    const ch = new Chess();
    this.moves = [];
    ch.load_pgn(this.selectedGame?.pgn)
    let history = ch.history();
    ch.reset();
    history.forEach((move: string) => {
      ch.move(move);
      this.moves.push(ch.fen());
    });

  }


}
