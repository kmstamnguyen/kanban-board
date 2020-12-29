import { Component, OnInit } from '@angular/core';
import { Board } from '../../interface/board';

import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  boards: Board[];
  error: string;
  constructor(
    private boardService: BoardService
  ) { }

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards(): void {
    this.boardService.getBoards()
    .subscribe(boards => this.boards = boards);
  }

  add(name: string): void {
    // name = name.trim();
    if (!name) { this.error = "Name is required field!";
    return; }
    this.boardService.addBoard({ name } as Board)
      .subscribe(board => {
        this.boards.push(board);
      });
  }

  delete(board: Board): void {
    this.boards = this.boards.filter(h => h !== board);
    this.boardService.deleteBoard(board).subscribe();
  }

}
