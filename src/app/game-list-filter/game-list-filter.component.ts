import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-list-filter',
  templateUrl: './game-list-filter.component.html',
  styleUrls: ['./game-list-filter.component.scss']
})
export class GameListFilterComponent implements OnInit {
  options = ['RPG', 'action', 'shooter', 'plateforme', 'combat'];

  constructor() { }

  ngOnInit() {
  }

}
