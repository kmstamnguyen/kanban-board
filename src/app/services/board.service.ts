import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Board } from '../interface/board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private boardsUrl = 'http://localhost:3000/boards';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient
  ) { }

  private log(message: string): void {
    console.log(`BoardService: ${message}`);
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

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.boardsUrl)
      .pipe(
        tap(_ => this.log('fetched Boards')),
        catchError(this.handleError<Board[]>('getBoards', []))
      );
  }


  /** POST: add a new board to the server */
  addBoard(board: Board): Observable<Board> {
    return this.http.post<Board>(this.boardsUrl, board, this.httpOptions).pipe(
      tap((newBoard: Board) => this.log(`added board w/ id=${newBoard._id}`)),
      catchError(this.handleError<Board>('addBoard'))
    );
  }

  /** DELETE: delete the board from the server */
  deleteBoard(board: Board | number): Observable<Board> {
    const id = typeof board === 'number' ? board : board._id;
    const url = `${this.boardsUrl}/${id}`;

    return this.http.delete<Board>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted board id=${id}`)),
      catchError(this.handleError<Board>('deleteBoard'))
    );
  }

  /** PUT: update the board on the server */
  updateBoard(board: Board): Observable<any> {
    return this.http.put(this.boardsUrl, board, this.httpOptions).pipe(
      tap(_ => this.log(`updated board id=${board._id}`)),
      catchError(this.handleError<any>('updateBoard'))
    );
  }

  // getBoard(id: string): Observable<Board> {
  //   const url = `${this.boardsUrl}/${id}`;
  //   return this.http.get<Board>(url).pipe(
  //     tap(_ => this.log(`fetched board id=${id}`)),
  //     catchError(this.handleError<Board>(`getBoard id=${id}`))
  //   );
  // }
}
