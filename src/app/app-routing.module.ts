import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { BoardComponent } from './components/board/board.component';
import { TaskComponent } from './components/task/task.component';
import { UsersComponent } from './components/users/users.component';

import { TaskDetailComponent } from './components/task-detail/task-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/board', pathMatch: 'full' },
  { path: 'board', component: BoardComponent },
  { path: 'board/detail/:id', component: TaskComponent },
  { path: 'task/add/:boardId', component: TaskDetailComponent },
  { path: 'task/edit/:id', component: TaskDetailComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
