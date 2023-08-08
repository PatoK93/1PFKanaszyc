import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent {
  
  displayedColumns: string[] = ['id', 'fullName', 'age', 'email', 'actions'];

  @Input()
  dataSource: Student[] = [];

  @Output()
  deleteStudent = new EventEmitter<Student>();

  @Output()
  editStudent = new EventEmitter<Student>();
  
}
