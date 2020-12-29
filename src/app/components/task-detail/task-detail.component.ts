import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../../interface/user';
import { UserService } from '../../services/user.service';

import { Board } from '../../interface/board';
import { Task, DetailTask } from '../../interface/task';
import { BoardService } from '../../services/board.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  users: User[];
  task: DetailTask;
  taskId: string;
  boardId: string;
  board: Board;
  joined: string;
  statuses = [ 'TODO', 'IN_PROGRESS', 'DONE' ];
  headerTitle: string;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private boardService: BoardService,
    private userService: UserService,
    private location: Location) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(!id){
      this.userService.getUsers()
      .subscribe(users => this.users = users);
      this.boardId =  this.route.snapshot.paramMap.get('boardId');
      this.boardService.getBoards()
      .subscribe(boards => this.board = boards.filter(b => b._id === this.boardId)[0]);
      this.task = {
        _id: null,
        title: '',
        status: 'TODO',
        joined: null,
        board: this.board,
      };
      this.headerTitle = 'Create a new task'
    }
    else{
      this.taskId =  this.route.snapshot.paramMap.get('id');
      this.boardService.getBoards()
      .subscribe(boards => this.board = boards.filter(b => b._id === this.boardId)[0]);
     
      this.userService.getUsers()
      .subscribe(users => this.users = users);
      this.getTask();
      // console.log("detail", this.taskId);
    }
    
    // 
  }

  goBack(): void {
    this.location.back();
  }

  getTask(): void {
    this.taskService.getTasks().subscribe(tasks => 
      {
        const task = tasks.filter(t => (t._id === this.taskId))[0];
        this.task = task;
        this.joined = task.joined[0] ? task.joined[0]._id : '';
        this.board = task.board;
        this.headerTitle = `Update Task: ${task.title}`;
        console.log("detail", tasks.filter(t => (t._id === this.route.snapshot.paramMap.get('id')))[0]);
        
      }
        );
  }

  save(id: string): void {
    if(id){
      console.log("update", this.task, this.joined);
    
      this.taskService.updateTask(this.task, this.joined)
      .subscribe(() => this.goBack());
    }
    else{
      const  { title, status } = this.task;
      
      if (!title || !status) { return; }
    this.taskService.addTask({ title, status, board: this.boardId } as Task)
      .subscribe(() => this.goBack());
    }
    
  }

}
