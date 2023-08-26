import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentFormDialogComponent } from './components/student-form-dialog/student-form-dialog.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { RouterModule } from '@angular/router';
import { StudentsRoutingModule } from './students-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StudentsEffects } from './store/students.effects';
import { studentsFeature } from './store/students.reducer';

@NgModule({
  declarations: [StudentsComponent, StudentFormDialogComponent, StudentsTableComponent],
  imports: [CommonModule, SharedModule, RouterModule, StudentsRoutingModule,
    StoreModule.forFeature(studentsFeature),
    EffectsModule.forFeature([StudentsEffects]],
  exports: [StudentsComponent],
})
export class StudentsModule {}
