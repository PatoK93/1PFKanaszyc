import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'students',
        loadChildren: () => import('./pages/students/students.module').then((m) => m.StudentsModule),
      },
      {
        path: 'teachers',
        loadChildren: () => import('./pages/teachers/teachers.module').then((m) => m.TeachersModule),
      },
      {
        path: 'courses',
        loadChildren: () => import('./pages/courses/courses.module').then((m) => m.CoursesModule),
      },
      {
        path: '**',
        redirectTo: 'home',
      }
    ]),
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule{}
