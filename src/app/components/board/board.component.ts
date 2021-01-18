import { Component, OnInit, ViewChild, EventEmitter, OnDestroy, ElementRef } from '@angular/core';
import { NgxChessBoardService, NgxChessBoardView } from 'ngx-chess-board';
import { BoardService } from '../../services/board.service';
import { Game } from '../../services/data.service';
import { Subscription, Subject } from 'rxjs';
import { StatsService } from '../../services/stats.service';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';

export class Stats {
  games: any;
}

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

  // search 
  month = [
    { name: "January", value: "01" },
    { name: "February", value: "02" },
    { name: "Mars", value: "03" },
    { name: "April", value: "04" },
    { name: "May", value: "05" },
    { name: "June", value: "06" },
    { name: "July", value: "07" },
    { name: "August", value: "08" },
    { name: "September", value: "09" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" },

  ]
  username;
  year = 2021;
  @ViewChild('monthValue') monthValue: MatSelect;

  public currentValue: string = null;

  constructor(private ngxChessBoardService: NgxChessBoardService, private boardService: BoardService, private statService: StatsService) {
    this.loading = this.boardService.loading;
  }

  ngOnInit(): void {
    this.subs.push(this.boardService.$selectedChanged.subscribe(() => {
      this.selectedGame = this.boardService.selectedGame;
      this.move = 0;
      this.updatePosition()
    }));
    this.subs.push(this.statService.$loading.subscribe(load => {
      console.log("load", load)
      this.loading = load;
    }))
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

  moveChange() {
    this.boardService.$positionChanged.next(this.board.getFEN());
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
    if (this.move >= this.boardService.moves.length) {
      console.error("Move nbr: ", num, " doesnt exist");
      return;
    }
    this.move = num;
    this.updatePosition();
  }

  updatePosition() {
    if (!this.move) return;
    this.board && this.board.setFEN(this.getCurrentPosition());
    this.boardService.$positionChanged.next(this.getCurrentPosition())
  }

  fetch() {
    this.loading = true;
    this.boardService.fetchGames({ user: this.username, year: this.year.toString(), month: this.monthValue.value });
  }

}
