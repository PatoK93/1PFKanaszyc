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
        loadChildren: () => import('./pages/students/students.module').then((s) => s.StudentsModule),
      },
      {
        path: 'teachers',
        loadChildren: () => import('./pages/teachers/teachers.module').then((t) => t.TeachersModule),
      },
      {
        path: 'courses',
        loadChildren: () => import('./pages/courses/courses.module').then((c) => c.CoursesModule),
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
