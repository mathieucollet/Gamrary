import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameListComponent} from './game-list.component';
import {GameListFilterModule} from '../game-list-filter/game-list-filter.module';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatCardModule, MatPaginatorModule, MatProgressSpinnerModule} from '@angular/material';


@NgModule({
  declarations: [GameListComponent],
  imports: [CommonModule, GameListFilterModule, RouterModule, MatButtonModule, MatProgressSpinnerModule, MatCardModule, MatPaginatorModule],
  exports: [GameListComponent]
})
export class GameListModule {
}
