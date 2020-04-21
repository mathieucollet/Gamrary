import {Component, OnInit} from '@angular/core';
import {GameApiService} from './services/game-api.service';
import {Games} from '../interfaces/games';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  games: Games[];

  filteredGames: any[];

  actualCardWidth = 500;
  baseCardWidth = 500;

  constructor(private gameApi: GameApiService) {
  }

  truncate(description) {
    return description.split(' ', 15).join(' ') + ' ...';
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
    this.filteredGames = this.games
      .filter(game =>
        (!form.name || game.title.includes(form.name))
        && (!form.type || (!!game.genres.find(genre => genre.id === Number(form.type))))
        && (!form.editor || game.publisher.name.includes(form.editor))
      );
  }

  getGamesList() {
    this.gameApi.getAllGames()
      .subscribe((data: Games[]) => {
        this.games = data;
        this.filtering({});
      });
  }

  ngOnInit() {
    this.getGamesList();
  }

}
