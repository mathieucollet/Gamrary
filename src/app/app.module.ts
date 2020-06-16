import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {GameListModule} from './game-list/game-list.module';
import {NotFoundModule} from './not-found/not-found.module';
import {GameDetailsModule} from './game-details/game-details.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GameFormModule} from './game-form/game-form.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GameListModule,
    NotFoundModule,
    GameDetailsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GameFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
