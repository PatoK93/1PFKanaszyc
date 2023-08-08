import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course } from './models/course.model';
import { Observable, Subject} from 'rxjs';
import { CoursesService } from './services/courses.service';
import { CoursesFormDialogComponent } from './components/course-form-dialog/courses-form-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnDestroy {

  public courses: Observable<Course[]>;
  public destroyed = new Subject<boolean>();
  public isLoading$: Observable<boolean>;

  constructor(
    private matDialog: MatDialog,
    private courseService: CoursesService,
  ) {
    this.courseService.loadCourses();
    this.isLoading$ = this.courseService.isLoading$;
    this.courses = this.courseService.getCourses();
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }

  onCreateCourse(): void {
    this.matDialog
      .open(CoursesFormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.courseService.createCourse({
              courseName: v.courseName
            });
          }
        },
      });
  }

  onDeleteCourse(courseToDelete: Course): void {
    if (confirm(`¿Está seguro de eliminar el curso ${courseToDelete.courseName}?`)) {
      this.courseService.deleteCourseById(courseToDelete.id);
    }
  }

  onEditCourse(courseToEdit: Course): void {
    this.matDialog
      .open(CoursesFormDialogComponent, {
        data: courseToEdit,
      })
      .afterClosed()
      .subscribe({
        next: (courseUpdated) => {
          if (courseUpdated) {
            this.courseService.updateCourseById(courseToEdit.id, courseUpdated);
          }
        },
      });
  }
}
