import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormDialogComponent } from './components/student-form-dialog/student-form-dialog.component';
import { Student } from './models/student.model';
import { StudentService } from './students.service';
import { Subject} from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnDestroy {

  public students: Student[] = [];

  public destroyed = new Subject<boolean>();

  constructor(
    private matDialog: MatDialog,
    private studentService: StudentService,
  ) {
    this.students = this.studentService.getStudents();
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }

  onCreateStudent(): void {
    this.matDialog
      // ABRO EL MODAL
      .open(StudentFormDialogComponent)
      // Y DESPUES DE QUE CIERRE
      .afterClosed()
      // HAGO ESTO...
      .subscribe({
        next: (v) => {
          if (v) {
            let newStudent = {
              id: this.students.length + 1,
              name: v.name,
              surname: v.surname,
              age: v.age,
              email: v.email,
              password: v.password,
            };
            this.students = [
              ...this.students,
              newStudent,
            ]
          }
        },
      });
  }

  onDeleteStudent(studentToDelete: Student): void {
    if (confirm(`¿Está seguro de eliminar a ${studentToDelete.name}?`)) {
      this.students = this.students.filter((s) => s.id !== studentToDelete.id);
    }
  }

  onEditStudent(studentToEdit: Student): void {
    this.matDialog
      // ABRO EL MODAL
      .open(StudentFormDialogComponent, {
        // LE ENVIO AL MODAL, EL USUARIO QUE QUIERO EDITAR
        data: studentToEdit,
      })
      // Y DESPUES DE QUE CIERRE
      .afterClosed()
      // HAGO ESTO...
      .subscribe({
        next: (studentUpdated) => {
          if (studentUpdated) {
            this.students = this.students.map((student) => {
              return student.id === studentToEdit.id
                ? { ...student, ...studentUpdated }
                : student;
            });
          }
        },
      });
  }
}
