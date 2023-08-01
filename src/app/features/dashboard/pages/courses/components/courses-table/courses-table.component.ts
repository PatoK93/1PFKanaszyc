import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models/course.model';


@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent {
  
  displayedColumns: string[] = ['id', 'courseName' ,'actions'];

  @Input()
  dataSource: Course[] = [];

  @Output()
  deleteCourse = new EventEmitter<Course>();

  @Output()
  editCourse = new EventEmitter<Course>();
}
