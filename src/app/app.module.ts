import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AccountsInMemoryDataService } from './services/accounts-in-memory-data';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountsSummaryComponent } from './components/accounts-summary/accounts-summary';

@NgModule({
  declarations: [AppComponent, AccountsSummaryComponent],
  imports: [HttpClientModule, BrowserModule, AppRoutingModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccountsInMemoryDataService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
