import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { NgxChessBoardService, NgxChessBoardView } from 'ngx-chess-board';
import { BoardService } from '../../services/board.service';
import { Game } from '../../services/data.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @ViewChild('board', { static: false }) board: NgxChessBoardView | undefined;
  boardSize = 600;

  // Blueish theme
  blackColor = "#8ea2ac";
  whiteColor = "#dee2e6";

  loading: boolean;

  selectedGame: Game | undefined;

  subs: Subscription[] = [];

  constructor(private ngxChessBoardService: NgxChessBoardService, private boardService: BoardService) {
    this.loading = this.boardService.loading;
  }

  ngOnInit(): void {
    this.subs.push(this.boardService.$selectedChanged.subscribe(() => {
      this.selectedGame = this.boardService.selectedGame;
    }));
  }

  /**
   * Undo move
   */
  undo(): void {

  }

  /**
   * Redo move
   */

  redo(): void {

  }

  next(direction: number = 1) {
    this.boardService.next(direction)
  }


  fetch() {
    this.boardService.fetchGames({ user: "PataLata", year: 2020, month: 12 });
  }
}
