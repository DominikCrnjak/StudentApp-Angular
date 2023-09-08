import { Injectable } from '@angular/core';
import { Student } from './student.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { SERVER_API_URL } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentsUrl = `${SERVER_API_URL}/student`;

  constructor(
    private http: HttpClient
  ) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl)
      .pipe(
        tap(_ => console.log('fetched students')),
        catchError(this.handleError<Student[]>('getStudents', []))
      );
  }

  getStudent(jmbag: string): Observable<Student> {
    const url = `${this.studentsUrl}/${jmbag}`;
    return this.http.get<Student>(url)
      .pipe(
        tap(_ => console.log(`fetched student jmbag=${jmbag}`)),
        catchError(this.handleError<Student>(`getStudent jmbag=${jmbag}`))
      );
  }

  updateStudent(student: Student): Observable<any> {
    const url = `${this.studentsUrl}/${student.jmbag}`;
    return this.http.put(url, student).pipe(
      tap(_ => console.log(`updated student jmbag=${student.jmbag}`)),
      catchError(this.handleError<any>('updateStudent'))
    );
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsUrl, student).pipe(
      tap((newStudent: Student) => console.log(`added student w/ JMBAG=${newStudent.jmbag}`)),
      catchError(this.handleError<Student>('addStudent'))
    );
  }

  deleteStudent(student: Student | string): Observable<Student> {
    const jmbag = typeof student === 'string' ? student : student.jmbag;
    const url = `${this.studentsUrl}/${jmbag}`;

    return this.http.delete<Student>(url).pipe(
      tap(_ => console.log(`deleted student JMBAG=${jmbag}`)),
      catchError(this.handleError<Student>('deleteStudent'))
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
