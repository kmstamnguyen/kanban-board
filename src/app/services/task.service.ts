import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Task, DetailTask } from '../interface/task';
import { Board } from '../interface/board';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = 'http://localhost:3000/tasks';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient
  ) { }

  private log(message: string): void {
    console.log(`TaskService: ${message}`);
  }
  // tslint:disable-next-line: typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getTasks(): Observable<DetailTask[]> {
    // const url = `${this.tasksUrl}/boardId=${id}`;
    // return this.http.get<Task>(url).pipe(
    //   tap(_ => this.log(`fetched tasks boardId=${id}`)),
    //   catchError(this.handleError<Task>(`getTask id=${id}`))
    // );


    return this.http.get<DetailTask[]>(this.tasksUrl)
      .pipe(
        tap(_ => this.log('fetched Tasks')),
        catchError(this.handleError<DetailTask[]>('getTasks', []))
      );
  }


  /** POST: add a new task to the server */
  addTask(task: Task): Observable<Task> {
    console.log("task", task);
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions).pipe(
      tap((newTask: Task) => this.log(`added task w/ id=${newTask._id}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  /** DELETE: delete the task from the server */
  deleteTask(task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task._id;
    const url = `${this.tasksUrl}/${id}`;

    return this.http.delete<Task>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted task id=${id}`)),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }

  /** PUT: update the task on the server */
  updateTask(task: DetailTask, userId: string): Observable<any> {
    const url = `${this.tasksUrl}/${task._id}`;
    return this.http.put(url,{
      status: task.status,
      title: task.title,
      joined: userId ? [userId] : [],
    }, this.httpOptions).pipe(
      tap(_ => this.log(`updated task id=${task._id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  // getTask(id: string): Observable<Task> {
  //   const url = `${this.tasksUrl}/${id}`;
  //   return this.http.get<Task>(url).pipe(
  //     tap(_ => this.log(`fetched task id=${id}`)),
  //     catchError(this.handleError<Task>(`getTask id=${id}`))
  //   );
  // }
}