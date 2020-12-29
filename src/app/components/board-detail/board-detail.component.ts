import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Board } from '../../interface/board';
import { Task } from '../../interface/task';
import { BoardService } from '../../services/board.service';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {

  tasks: Task[];

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private taskService: TaskService,
    private location: Location
  ) {}

  ngOnInit(): void {
   
  }

}
