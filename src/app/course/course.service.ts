import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Course } from './course.model';
import { SERVER_API_URL } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private coursesUrl = `${SERVER_API_URL}/course`;

  constructor(
    private http: HttpClient
  ) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl)
      .pipe(
        tap(_ => console.log('fetched courses')),
        catchError(this.handleError<Course[]>('getCourses', []))
      );
  }

  getCoursesByJmbag(jmbag: string): Observable<Course[]> {
    const params = new HttpParams().set('jmbag', jmbag);

    return this.http.get<Course[]>(this.coursesUrl, { params })
      .pipe(
        tap(_ => console.log(`fetched courses jmbag=${jmbag}`)),
        catchError(this.handleError<Course[]>(`getCourses jmbag=${jmbag}`, []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation);
      console.error(error);
      return of(result as T);
    };
  }
}
