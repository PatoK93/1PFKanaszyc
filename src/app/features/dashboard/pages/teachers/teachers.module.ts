import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeacherFormDialogComponent } from './components/teacher-form-dialog/teacher-form-dialog.component';
import { TeachersTableComponent } from './components/teachers-table/teachers-table.component';
import { RouterModule } from '@angular/router';
import { TeachersRoutingModule } from './teachers-routing.module';

@NgModule({
  declarations: [TeachersComponent, TeacherFormDialogComponent, TeachersTableComponent],
  imports: [CommonModule, SharedModule, RouterModule, TeachersRoutingModule],
  exports: [TeachersComponent],
  providers: [],
})
export class TeachersModule {}
