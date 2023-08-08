import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { MatCardModule } from '@angular/material/card';
import { AuthModule } from './features/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
    AuthModule,
    MatCardModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
