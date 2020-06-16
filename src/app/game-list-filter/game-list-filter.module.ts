import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameListFilterComponent} from './game-list-filter.component';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';


@NgModule({
  declarations: [GameListFilterComponent],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  exports: [GameListFilterComponent]
})
export class GameListFilterModule {
}
