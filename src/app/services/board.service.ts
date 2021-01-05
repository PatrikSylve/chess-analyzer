import { Injectable } from '@angular/core';
import { UserGames, DataService, GameResponse, Game } from './data.service'
import * as chess from "chess.js";


@Injectable({
  providedIn: 'root'
})

export class BoardService {

  games: Game[] = [];
  selectedGame: Game | undefined;

  constructor(private dataService: DataService) { }

  selectGame(game: Game) {
    this.selectedGame = game;
  }

  getSelectedGame(): Game | undefined {
    return this.selectedGame;
  }

  fetchGames(user: UserGames) {
    this.dataService.fetchGames(user).then(res => {
      return res.json();
    }).then(json => {
      this.games = json.games;
      console.log(this.games[0].black.username)
    })
  }



}
