import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Teacher } from '../../models/teacher.model';

@Component({
  selector: 'app-teacher-form-dialog',
  templateUrl: './teacher-form-dialog.component.html',
  styleUrls: ['./teacher-form-dialog.component.scss'],
})
export class TeacherFormDialogComponent {
  editingTeacher?: Teacher;

  nameControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]);
  surnameControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]);
  ageControl = new FormControl<number | null>(null, [Validators.required, Validators.min(18), Validators.max(100)]);
  emailControl = new FormControl<string | null>(null, [Validators.required, Validators.email]);
  passwordControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]);

  teacherForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    age: this.ageControl,
    email: this.emailControl,
    password: this.passwordControl,
  });

  constructor(
    private dialogRef: MatDialogRef<TeacherFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Teacher
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
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
      return;
    } else {
      this.dialogRef.close(this.teacherForm.value);
    }
  }
  
}
