import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../courses/services/courses.service';
import { Course } from '../../../courses/models/course.model';
import { Store } from '@ngrx/store';
import { StudentsActions } from '../../store/students.actions';
import { Observable } from 'rxjs';
import { selectStudentsDetailName } from '../../store/students.selectors';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styles: [
  ]
})
export class StudentDetailComponent implements OnInit {

  displayedColumns = ['id', 'name'];
  courses: Course[] = [];
  studentName$: Observable<string | undefined>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CoursesService,
    private store: Store,
  ) {
    this.studentName$ = this.store.select(selectStudentsDetailName);
  }

  ngOnInit(): void {
    this.store.dispatch(StudentsActions.loadStudentDetail({ studentId: this.activatedRoute.snapshot.params['id'] }))
    this.courseService.getCoursesByStudentId(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (courses) => (this.courses = courses),
    })
  }

}
