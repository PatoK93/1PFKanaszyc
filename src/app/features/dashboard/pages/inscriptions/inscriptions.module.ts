import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsComponent } from './inscriptions.component';
import { SharedModule } from '../../../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionEffects } from './store/inscription.effects';
import { StoreModule } from '@ngrx/store';
import { InscriptionFeature } from './store/inscription.reducer';
import { InscriptionDialogComponent } from './components/inscription-dialog/inscription-dialog.component';

@NgModule({
  declarations: [InscriptionsComponent, InscriptionDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    InscriptionsRoutingModule,
    StoreModule.forFeature(InscriptionFeature),
    EffectsModule.forFeature([InscriptionEffects])
  ],
})
export class InscriptionsModule {}
