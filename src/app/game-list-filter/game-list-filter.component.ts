import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GameApiService} from '../services/game-api.service';
import {Categories} from '../interfaces/categories';
import {Filter} from '../models/filter';

type TargetType = any | { name: string, value: string };

@Component({
  selector: 'app-game-list-filter',
  templateUrl: './game-list-filter.component.html',
  styleUrls: ['./game-list-filter.component.scss']
})
export class GameListFilterComponent implements OnInit {
  @Output() filtered = new EventEmitter();

  form = new Filter();
  categories: Categories[];

  constructor(private gameApi: GameApiService) {
  }

  setValue(target: TargetType) {
    this.form[target.name] = target.value;
  }

  razFilter() {
    const that = this.form;
    Object.keys(this.form).map((key, index) => {
      that[key] = '';
    });
    this.filtered.emit(this.form);
  }

  getCategoriesList() {
    this.gameApi.getAllCategories()
      .subscribe((data: Categories[]) => {
        this.categories = data;
      });
  }

  ngOnInit() {
    this.getCategoriesList();
  }

  onSubmit() {
    this.filtered.emit(this.form);
  }
}
