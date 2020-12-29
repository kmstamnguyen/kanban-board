import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Board } from '../../interface/board';
import { Task, DetailTask } from '../../interface/task';
import { BoardService } from '../../services/board.service';
import { TaskService } from '../../services/task.service';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: DetailTask[];
  boardId: string;
  board: Board;
  statuses = [ 'TODO', 'IN_PROGRESS', 'DONE' ];
  columns = [
    {
      name: 'TODO',
      tasks:  [
      ],
    },
    {
      name: 'IN PROGRESS',
      tasks: [],
    },
    {
      name: 'DONE',
      tasks: [],
    }
  ];


  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private taskService: TaskService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.boardService.getBoards().subscribe(boards => {
      this.board = boards.filter(b => b._id === id)[0];
    });
    this.boardId = id;
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks.filter(t => t.board && t.board?._id === id );
      this.columns[0].tasks = this.tasks.filter(t=> t.status === 'TODO');
      this.columns[1].tasks = this.tasks.filter(t=> t.status === 'IN_PROGRESS');
      this.columns[2].tasks = this.tasks.filter(t=> t.status === 'DONE');
    });
  }

  // tslint:disable-next-line: typedef
  drop(event: CdkDragDrop<any[]>, name: string) {
    console.log("event", event, name);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      const newTasks = event.container.data;
      const newStatus = name === "IN PROGRESS" ? 'IN_PROGRESS' : name;
    
      newTasks.forEach(task => {
        const currentStatus = task.status;
        if(currentStatus !== newStatus){
          //update status
          this.taskService.updateTask({
            ...task,
            status: newStatus,
          }, task.joined[0])
      .subscribe(() => console.log("updated"));

        }
      });
    }
  }

  add(title: string, status: string): void {
    if (!title || !status) { return; }
    this.taskService.addTask({ title, status, board: this.boardId } as Task)
      .subscribe(task => {
        this.tasks.push({
          ...task,
          joined: [],
          board: this.board,
        });
      });
  }

  goBack(): void {
    this.location.back();
  }
}
