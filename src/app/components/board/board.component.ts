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

  move: number = 0;
  subs: Subscription[] = [];


  constructor(private ngxChessBoardService: NgxChessBoardService, private boardService: BoardService) {
    this.loading = this.boardService.loading;
  }

  ngOnInit(): void {
    this.subs.push(this.boardService.$selectedChanged.subscribe(() => {
      this.selectedGame = this.boardService.selectedGame;
      this.updatePosition()
    }));
  }

  /**
   * Undo move
   */
  undo(): void {
    this.move > 0 && this.move--;
    this.updatePosition()
  }

  /**
   * Redo move
   */

  redo(): void {
    this.move < this.boardService.moves.length - 1 && this.move++;
    this.updatePosition();
  }

  /**
   * next game in list
   * @param direction 
   */
  next(direction: number = 1) {
    this.boardService.next(direction)
  }

  /**
   * Return FEN on index move from moves-array
   */
  getCurrentPosition() {
    return this.boardService.moves[this.move];
  }

  updatePosition() {
    this.board && this.board.setFEN(this.getCurrentPosition())
  }

  fetch() {
    this.boardService.fetchGames({ user: "PataLata", year: 2020, month: 12 });
  }

}
