import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../../services/board.service';
import { StatsService } from '../../../services/stats.service';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface GameInfo {
  white: string,
  black: string,
  result: string,
  url: string,
  index: number
}
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  gameInfo = [];
  displayedColumns: string[] = ['index', 'white', 'black', 'result', 'url'];
  subs: Subscription[] = [];
  constructor(private boardService: BoardService, private statsService: StatsService) { }

  ngOnInit(): void {
    this.subs.push(this.boardService.$positionChanged.subscribe(pos => {
      this.gameInfo = [];
      this.statsService.gamesWithPosition(pos).forEach(index => {
        let info = this.getGameInfo(index);
        info && this.gameInfo.push(info);
      });
    }))
  }

  selectGame(index) {
    window.scrollTo(0, 30)
    this.boardService.selectGameByIndex(index);
  }

  getGameInfo(index: number): GameInfo {
    let game = this.boardService.games[index];
    return {
      white: game.white.username + "(" + game.white.rating + ")",
      black: game.black.username + "(" + game.black.rating + ")",
      result: game.white.result + " - " + game.black.result,
      url: game.url,
      index: index
    }
  }

}
