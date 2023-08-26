import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InscriptionActions } from './store/inscription.actions';
import { InscriptionWithStudentAndCourse } from './models/inscription.model';
import { selectinscriptions } from './store/inscription.selectors';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionDialogComponent } from './components/inscription-dialog/inscription-dialog.component';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styles: [],
})
export class InscriptionsComponent implements OnInit {
  displayedColumns = ['id', 'course', 'student'];
  inscriptions$: Observable<InscriptionWithStudentAndCourse[]>;

  constructor(private store: Store, private matDialog: MatDialog) {
    this.inscriptions$ = this.store.select(selectinscriptions)
  }

  onAdd(): void {
    this.matDialog.open(InscriptionDialogComponent);
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionActions.loadInscriptions())
  }
}
