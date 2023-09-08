import { Component, OnInit } from '@angular/core';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html'
})
export class StudentCreateComponent implements OnInit {

  student: Student;

  constructor() { }

  ngOnInit(): void {
    this.student = new Student();
  }

}
