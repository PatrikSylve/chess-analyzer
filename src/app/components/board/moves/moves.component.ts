import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Move, DataService } from '../../../services/data.service';
import { BoardService } from '../../../services/board.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.scss']
})
export class MovesComponent implements OnInit, OnDestroy {
  // moves: Move[] = [{ move: 'e4', move_number: 1 },
  // { move: 'e5' },
  // { move: 'Nf3', move_number: 2 },
  // { move: 'Nc6' },
  // { move: 'Bc4', move_number: 3 },
  // { move: 'Bc5' },
  // { move: 'b4', move_number: 4 },
  // { move: 'Bxb4' },
  // { move: 'c3', move_number: 5 },
  // { move: 'Ba5' },
  // { move: 'd4', move_number: 6 },
  // { move: 'exd4' },
  // { move: 'O-O', move_number: 7 },
  // { move: 'Nge7' }]
  @Input() moveNbr;
  @Output() goToMove = new EventEmitter<number>();
  moves: Move[] = [];
  subs: Subscription[] = [];
  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.subs.push(this.boardService.$selectedChanged.subscribe(game => {
      this.moves = this.boardService.getMoves();
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }

  moveClicked(i: number) {
    this.goToMove.emit(i);
  }
}
