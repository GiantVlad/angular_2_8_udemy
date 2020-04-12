import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {PostModel} from './post.model';
import {map, catchError, tap} from 'rxjs/operators';
import {Observable, Subject, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  errorSubject = new Subject<string>();
  constructor(private http: HttpClient) { }

  createPost(postData: PostModel): void {
    this.http
      .post<{ name: string }>(
        'https://udemy-angular-aaa1e.firebaseio.com/posts.json',
        postData,
        {
          // to return all response
          observe: 'response',
          responseType: 'json'/*'text',*/
        }
      ).subscribe(res => {
        console.log(res);
    }, error => {
      this.errorSubject.next(error.message);
    });
  }

  getData(): Observable<PostModel[]> {
    /* Multiple params
    let params = new HttpParams().set('print', 'pretty');
    params =  params.append('search', 'blalal');
    */
    return this.http
      .get<{ [key: string]: PostModel }>(
        'https://udemy-angular-aaa1e.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({Platform: 'ios'}),
          params: new HttpParams().set('print', 'pretty'),
        }
        )
      .pipe(
        map(posts => {
          const dataArray: PostModel[] = [];
          for (const key in posts) {
            if (posts.hasOwnProperty(key)) {
              dataArray.push({ ...posts[key], id: key});
            }
          }
          return dataArray;
        }), catchError((errorResponse) => {
          // send error report
          return throwError(errorResponse);
        }));
  }

  delete(id: string): Observable<any> {
    return this.http
      .delete<{ name: string }>('https://udemy-angular-aaa1e.firebaseio.com/posts.json',
      { params: id === '' ? null : new HttpParams().set('name', id),
          observe: 'events'
      })
      .pipe(
        tap(event => {
          if (event.type === HttpEventType.Sent) {
            console.log('It is sent event');
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
