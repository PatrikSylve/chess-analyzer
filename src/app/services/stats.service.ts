import { Injectable, EventEmitter } from '@angular/core';
import { Game, DataService } from './data.service';

export interface GamePositions {
  index: number,
  fen: string[]
}
@Injectable({
  providedIn: 'root'
})
export class StatsService {

  games: Game[] = [];
  fenList: GamePositions[] = [];
  $loading: EventEmitter<boolean> = new EventEmitter();
  constructor(private dataService: DataService) { }

  addGames(games: Game[]) {
    this.$loading.next(true);
    this.games = games;
    let that = this;
    that.generateFenList();
    that.$loading.next(false);

  }

  /**
   * Get first move frequency
   */
  firstMove() {
    let firstMoves = {};
    this.games.forEach(game => {
      let move = this.dataService.parsePgn(game.pgn).moves[0].move;
      firstMoves?.[move] ? firstMoves[move]++ : (firstMoves[move] = 1);
    });
    return firstMoves
  }

  /**
   * Get list of all positions from all games 
   */
  generateFenList() {
    let start = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    this.games.forEach((game, i) => {
      this.fenList.push({
        fen: [start, ...this.dataService.generateFEN(game)],
        index: i
      });
    })
  }

  // Games with same positions as current 
  gamesWithPosition(pos) {
    if (!pos || !this.games.length) return null;
    pos = this.dataService.getFenFromFen(pos);
    let games = [];
    this.fenList.forEach(game => {
      if (game.fen.includes(pos)) {
        games.push(game.index);
      }
    })
    return games;
  }
  // Number of wins/lost games form current position 

  // Games against opponent 

  //


}
