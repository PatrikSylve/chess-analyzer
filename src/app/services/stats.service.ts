import { Injectable } from '@angular/core';
import { Game, DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  games: Game[] = [];
  constructor(private dataService: DataService) { }

  addGames(games: Game[]) {
    this.games = games;
  }

  firstMove() {
    let firstMoves = {};
    console.log(this.games.length)
    this.games.forEach(game => {
      let move = this.dataService.parsePgn(game.pgn).moves[0].move;
      firstMoves?.[move] ? firstMoves[move]++ : (firstMoves[move] = 1);
    });
    console.log(firstMoves);
    return firstMoves
  }

  // Games with same positions as current 
  gamesWithPosition(pos) {
    let games = [];
    this.games.forEach(game => {
      if (this.dataService.generateFEN(game).find(pos)) {
        games.push({ game: game, pos: this.games.indexOf(game) })
      };
    })
    return games;
  }
  // Number of wins/lost games form current position 

  // Games against opponent 

  //


}
