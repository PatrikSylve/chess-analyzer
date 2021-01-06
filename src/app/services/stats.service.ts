import { Injectable } from '@angular/core';
import { Game, DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  games: Game[];
  constructor(private dataService: DataService) { }

  addGames(games: Game[]) {
    this.games.concat(...games);
  }

  firstMove() {
    let firstMoves = {};
    this.games.forEach(game => {
      let move = this.dataService.parsePgn(game.pgn).moves[0].move;
      firstMoves?.[move] ? firstMoves[move]++ : (firstMoves[move] = 1);
    });
    console.log(firstMoves);
    return firstMoves
  }

  // Games with same positions as current 

  // Number of wins/lost games form current position 

  // Games against opponent 

  //


}
