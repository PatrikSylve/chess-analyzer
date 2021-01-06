import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../../services/board.service';
import { StatsService } from '../../../services/stats.service';
import { Subscription } from 'rxjs';

export interface GameList {
  white: string,
  black: string,
  result: string,
  url: string
}
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  games = [];

  subs: Subscription[] = [];
  constructor(private boardService: BoardService, private statsService: StatsService) { }

  ngOnInit(): void {
    this.subs.push(this.boardService.$positionChanged.subscribe(pos => {
      this.statsService.gamesWithPosition(pos);
    }))
  }

}
