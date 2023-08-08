import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormDialogComponent } from './components/student-form-dialog/student-form-dialog.component';
import { Student } from './models/student.model';
import { StudentService } from './services/students.service';
import { Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnDestroy {

  public students: Observable<Student[]>;
  public destroyed = new Subject<boolean>();
  public isLoading$: Observable<boolean>;

  constructor(
    private matDialog: MatDialog,
    private studentService: StudentService,
  ) {
    this.studentService.loadStudents();
    this.isLoading$ = this.studentService.isLoading$;
    this.students = this.studentService.getStudents();
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }

  onCreateStudent(): void {
    this.matDialog
      .open(StudentFormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.studentService.createStudent({
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

  onDeleteStudent(studentToDelete: Student): void {
    if (confirm(`¿Está seguro de eliminar a ${studentToDelete.name}?`)) {
      this.studentService.deleteStudentById(studentToDelete.id);
    }
  }

  onEditStudent(studentToEdit: Student): void {
    this.matDialog
      .open(StudentFormDialogComponent, {
        data: studentToEdit,
      })
      .afterClosed()
      .subscribe({
        next: (studentUpdated) => {
          if (studentUpdated) {
            this.studentService.updateStudentById(studentToEdit.id, studentUpdated);
          }
        },
      });
  }
  
}
