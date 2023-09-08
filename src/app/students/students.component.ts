import { Component, OnInit } from '@angular/core';
import { Student } from './student.model';
import { StudentService} from './student.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html'
})
export class StudentsComponent implements OnInit {

  students: Student[];

  constructor(
    private studentService: StudentService,
    private router: Router,
    private toastrService: ToastrService,
    public userService: UserService
    ) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(students => this.students = students);
  }

  navigateToEdit(student: Student) {
    this.router.navigate([`/students/edit/${student.jmbag}`]);
  }

  navigateToDetails(student: Student) {
    this.router.navigate([`/students/detail/${student.jmbag}`]);
  }

  deleteStudent(student: Student) {
    this.students = this.students.filter(s => s !== student);
    this.studentService.deleteStudent(student).subscribe(
      () => this.toastrService.success('Uspješno ste obrisali studenta!'),
      () => this.toastrService.success('Došlo je do pogreške prilikom brisanja studenta!')
    );
  }

}
