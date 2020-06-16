import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameDetailsComponent} from './game-details.component';
import {MatIconModule} from '@angular/material';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [GameDetailsComponent],
  imports: [CommonModule, MatIconModule, RouterModule],
  exports: [GameDetailsComponent]
})
export class GameDetailsModule {
}
