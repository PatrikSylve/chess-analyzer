import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxChessBoardService, NgxChessBoardView } from 'ngx-chess-board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @ViewChild('board', { static: false }) board: NgxChessBoardView | undefined;
  boardSize = 800;

  // Blueish theme
  blackColor = "#8ea2ac";
  whiteColor = "#dee2e6";

  constructor(private ngxChessBoardService: NgxChessBoardService) { }

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
}
