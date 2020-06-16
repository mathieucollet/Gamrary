import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameFormComponent} from './game-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSliderModule
} from '@angular/material';
import {AppRoutingModule} from '../app-routing.module';


@NgModule({
  declarations: [GameFormComponent],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSliderModule, MatSelectModule, MatButtonModule, AppRoutingModule, MatAutocompleteModule, MatCardModule],
  exports: [GameFormComponent]
})
export class GameFormModule {
}
