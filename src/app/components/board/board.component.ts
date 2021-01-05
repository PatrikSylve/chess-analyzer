import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxChessBoardService, NgxChessBoardView } from 'ngx-chess-board';
import { BoardService } from 'src/app/services/board.service';

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

  constructor(private ngxChessBoardService: NgxChessBoardService, private boardService: BoardService) { }

  ngOnInit(): void {
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


  fetch() {
    this.boardService.fetchGames({ user: "PataLata", year: 2020, month: 12 });
  }
}
