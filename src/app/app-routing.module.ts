import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { StudentDetailComponent } from './students/student-detail/student-detail.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StudentCreateComponent } from './students/student-create/student-create.component';
import { StudentEditComponent } from './students/student-edit/student-edit.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { AdminAuthGuardService } from './guards/admin-auth-guard.service';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'students',
    component: StudentsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'students/detail/:jmbag',
    component: StudentDetailComponent,
    canActivate: [AdminAuthGuardService]
  },
  {
    path: 'students/create',
    component: StudentCreateComponent,
    canActivate: [AdminAuthGuardService]
  },
  {
    path: 'students/edit/:jmbag',
    component: StudentEditComponent,
    canActivate: [AdminAuthGuardService]
  },
  {
    path: 'forbidden',
    component: ForbiddenPageComponent
  },
  {
    path: '', redirectTo: 'main', pathMatch: 'full'
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
