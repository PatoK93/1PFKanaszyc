import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthComponent } from './features/auth/auth.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { StudentsComponent } from './features/dashboard/pages/students/students.component';
import { CoursesComponent } from './features/dashboard/pages/courses/courses.component';
import { TeachersComponent } from './features/dashboard/pages/teachers/teachers.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'students',
        component: StudentsComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent,
      },
      {
        path: 'teachers',
        component: TeachersComponent,
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      }
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

