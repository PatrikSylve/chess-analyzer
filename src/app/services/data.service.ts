import { Injectable } from '@angular/core';
import * as Chess from 'chess.js';
import * as pgnParser from 'pgn-parser';

export interface UserGames {
  user: string,
  year: number,
  month: number
}

export interface GameResponse {
  games: Game[],
}

export interface Game {
  url: string,
  pgn: string,
  fen: string,
  white: Player,
  black: Player,
  time_class: string,
  rules: string,
  time_constrol: string,
}

export interface Player {
  rating: number,
  result: string,
  username: string
}

export interface PGN {
  result: string,
  moves: Move[]
}

export interface Move {
  move: string,
  move_number: number
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  base: string = "https://api.chess.com/";
  // @ts-ignore
  chessjs = new Chess();
  constructor() { }


  fetchGames(user: UserGames) {
    let url = this.base + "pub/player/" + user.user + "/games/" + user.year + "/" + user.month;
    return fetch(url);
  }

  parsePgn(pgn: string): PGN {
    return pgnParser.parse(pgn)?.[0];
  }

  generateFEN(game) {
    const moves = [];
    this.chessjs.load_pgn(game?.pgn)
    let history = this.chessjs.history();
    this.chessjs.reset();
    history.forEach((move: string) => {
      this.chessjs.move(move);
      moves.push(this.chessjs.fen());
    });

    return moves;
  }
}
