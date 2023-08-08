import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TeacherFormDialogComponent } from './components/teacher-form-dialog/teacher-form-dialog.component';
import { Teacher } from './models/teacher.model';
import { TeacherService } from './services/teachers.service';
import { Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
})
export class TeachersComponent implements OnDestroy {

  public teachers: Observable<Teacher[]>;

  public destroyed = new Subject<boolean>();

  constructor(
    private matDialog: MatDialog,
    private teacherService: TeacherService,
  ) {
    this.teacherService.loadTeachers();
    this.teachers = this.teacherService.getTeachers();
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }

  onCreateTeacher(): void {
    this.matDialog
      .open(TeacherFormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.teacherService.createTeacher({
              name: v.name,
              age: v.age,
              email: v.email,
              password: v.password,
              surname: v.surname,
            });
          }
        },
      });
  }

  onDeleteTeacher(teacherToDelete: Teacher): void {
    if (confirm(`¿Está seguro de eliminar a ${teacherToDelete.name}?`)) {
      this.teacherService.deleteTeacherById(teacherToDelete.id);
    }
  }

  onEditTeacher(teacherToEdit: Teacher): void {
    this.matDialog
      .open(TeacherFormDialogComponent, {
        data: teacherToEdit,
      })
      .afterClosed()
      .subscribe({
        next: (teacherUpdated) => {
          if (teacherUpdated) {
            this.teacherService.updateTeacherById(teacherToEdit.id, teacherUpdated);
          }
        },
      });
  }
  
}
