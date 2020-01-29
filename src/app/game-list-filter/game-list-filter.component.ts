import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GameCategories} from '../game-categories.enum';

type TargetType = any | { name: string, value: string };

@Component({
  selector: 'app-game-list-filter',
  templateUrl: './game-list-filter.component.html',
  styleUrls: ['./game-list-filter.component.scss']
})
export class GameListFilterComponent implements OnInit {
  @Output() filtered = new EventEmitter();

  categories = GameCategories;

  form = {
    name: '',
    type: '',
    editor: '',
  };

  setValue(target: TargetType) {
    this.form[target.name] = target.value;
  }

  filter() {
    this.filtered.emit(this.form);
  }

  razFilter() {
    const that = this.form;
    Object.keys(this.form).map((key, index) => {
      that[key] = '';
    });
    this.filtered.emit(this.form);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
