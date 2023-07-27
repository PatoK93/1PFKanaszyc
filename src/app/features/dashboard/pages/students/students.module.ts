import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentFormDialogComponent } from './components/student-form-dialog/student-form-dialog.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [StudentsComponent, StudentFormDialogComponent, StudentsTableComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [StudentsComponent],
  providers: [],
})
export class StudentsModule {}
