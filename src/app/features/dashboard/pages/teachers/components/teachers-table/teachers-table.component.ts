import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Teacher } from '../../models/teacher.model';

@Component({
  selector: 'app-teachers-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.scss']
})
export class TeachersTableComponent {
  
  displayedColumns: string[] = ['id', 'fullName', 'age', 'email', 'actions'];

  @Input()
  dataSource: Teacher[] = [];

  @Output()
  deleteTeacher = new EventEmitter<Teacher>();

  @Output()
  editTeacher = new EventEmitter<Teacher>();
  
}
