import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '**',
        redirectTo: '/auth/login',
      },
    ])
  ]
})
export class AuthRoutingModule {}
