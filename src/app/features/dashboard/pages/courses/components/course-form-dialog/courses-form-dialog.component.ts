import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-courses-form-dialog',
  templateUrl: './courses-form-dialog.component.html',
  styleUrls: ['./courses-form-dialog.component.scss'],
})
export class CoursesFormDialogComponent {
  editingCourse?: Course;

  courseNameControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]);

  courseForm = new FormGroup({
    courseName: this.courseNameControl,
  });

  constructor(
    private dialogRef: MatDialogRef<CoursesFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Course
  ) {
    if (this.data) {
      this.courseNameControl.setValue(this.data.courseName);
    }
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    } else {
      this.dialogRef.close(this.courseForm.value);
    }
  }
}
