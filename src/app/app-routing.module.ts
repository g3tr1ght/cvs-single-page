import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsSummaryComponent } from './components/accounts-summary/accounts-summary';

const routes: Routes = [{ path: '', component: AccountsSummaryComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
