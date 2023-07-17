import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form-dialog',
  templateUrl: './student-form-dialog.component.html',
  styleUrls: ['./student-form-dialog.component.scss'],
})
export class StudentFormDialogComponent {

  nameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(2)
  ]);
  surnameControl = new FormControl<string | null>(null, [Validators.required]);
  ageControl = new FormControl<number | null>(null, [Validators.required]);
  emailControl = new FormControl<string | null>(null, [Validators.required]);
  passwordControl = new FormControl<string | null>(null, [Validators.required]);

  studentForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    age: this.ageControl,
    email: this.emailControl,
    password: this.passwordControl,
  });

  constructor(
    private dialogRef: MatDialogRef<StudentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Student
  ) {
    if (this.data) {
      this.nameControl.setValue(this.data.name);
      this.surnameControl.setValue(this.data.surname);
      this.ageControl.setValue(this.data.age);
      this.passwordControl.setValue(this.data.password);
      this.emailControl.setValue(this.data.email);
    }
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.studentForm.value);
    }
  }
}
