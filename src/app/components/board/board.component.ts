import { Component, OnInit, ViewChild, EventEmitter, OnDestroy } from '@angular/core';
import { NgxChessBoardService, NgxChessBoardView } from 'ngx-chess-board';
import { BoardService } from '../../services/board.service';
import { Game } from '../../services/data.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

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
      this.move = 0;
      this.updatePosition()
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(s => {
      s.unsubscribe();
    })
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
    this.updatePosition();
  }

  /**
   * Return FEN on index move from moves-array
   */
  getCurrentPosition() {
    return this.boardService.moves[this.move];
  }

  getMoves() {
    return this.boardService.moves;
  }

  setMoveNumber(num: number) {
    this.move = num;
    this.updatePosition();
  }

  updatePosition() {
    this.board && this.board.setFEN(this.getCurrentPosition())
  }

  fetch() {
    this.boardService.fetchGames({ user: "PataLata", year: 2020, month: 12 });
  }

}
