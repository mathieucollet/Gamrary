import {Component, OnInit} from '@angular/core';
import {GameFakeApiService} from './services/game-fake-api.service';
import {GameCategoryFakeApiService} from './services/game-category-fake-api.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  jeux: any[];

  filteredGames: any[];

  actualCardWidth = 500;
  baseCardWidth = 500;

  constructor(private gameApi: GameFakeApiService, private categoriesApi: GameCategoryFakeApiService) {
  }

  truncate(description) {
    return description.split(' ', 20).join(' ') + ' ...';
  }

  buttonAlert(event) {
    alert('You clicked on ' + event.type + ' for the game ' + event.game);
  }

  changeCardSize(value: number, negative: boolean = false) {
    this.actualCardWidth += negative ? -value : value;
  }

  resetCardSize() {
    this.actualCardWidth = this.baseCardWidth;
  }

  filtering(form) {
    this.filteredGames = this.jeux
      .filter(jeu =>
        (!form.name || jeu.titre.includes(form.name))
        && (!form.type || jeu.types.includes(form.type))
        && (!form.editor || jeu.editor.includes(form.editor))
      );
  }

  ngOnInit() {
    this.gameApi.getAll().subscribe(
      value => {
        this.jeux = value;
        console.log(this.jeux);
        this.filtering({});
      }
    );
  }

}
