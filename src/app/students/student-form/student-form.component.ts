import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../student.model';
import { StudentService } from '../student.service';
import { ToastrService } from 'ngx-toastr';
import { delay } from '../../util/delay';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html'
})
export class StudentFormComponent implements OnInit {

  @Input() formType: 'CREATE' | 'EDIT';

  @Input() student: Student;

  saving = false;

  constructor(
    private studentService: StudentService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  save() {
    this.student.dateOfBirth = "2001-11-11";
    this.saving = true;
    if (this.formType === 'CREATE') {
      this.createNewStudent();
    } else if (this.formType === 'EDIT')  {
      this.updateStudent();
    } else {
      throw Error('UNSUPPORTED FORM TYPE');
    }
  }

  createNewStudent() {
    this.studentService.addStudent(this.student).subscribe(
      (student: Student) => {
        this.student = student;
        this.toastrService.success('Uspješno ste spremili podatke studenta!');
        delay(2000).then(() => this.router.navigate(['students']));
      },
      () => {
        this.toastrService.error('Došlo je do pogreške prilikom spremanja podataka studenta!');
        this.saving = false;
      }
    );
  }

  updateStudent() {
    this.studentService.updateStudent(this.student).subscribe(
      (student: Student) => {
        this.student = student;
        this.toastrService.success('Uspješno ste spremili podatke studenta!');
        delay(2000).then(() => this.router.navigate(['students']));
      },
      () => {
        this.toastrService.error('Došlo je do pogreške prilikom spremanja podataka studenta!');
        this.saving = false;
      }
    );
  }

}
