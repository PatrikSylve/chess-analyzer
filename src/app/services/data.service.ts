import { Injectable } from '@angular/core';

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

@Injectable({
  providedIn: 'root'
})
export class DataService {
  base: string = "https://api.chess.com/";

  constructor() { }


  fetchGames(user: UserGames) {
    let url = this.base + "pub/player/" + user.user + "/games/" + user.year + "/" + user.month;
    return fetch(url);
  }
}