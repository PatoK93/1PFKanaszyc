import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { CoursesFormDialogComponent } from './components/course-form-dialog/courses-form-dialog.component';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [CoursesComponent, CoursesFormDialogComponent, CoursesTableComponent],
  imports: [CommonModule, SharedModule, RouterModule, CoursesRoutingModule],
  exports: [CoursesComponent],
  providers: [],
})
export class CoursesModule {}
