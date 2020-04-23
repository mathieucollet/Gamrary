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
  pagination: any[];
  currentPage: {};

  actualCardWidth = 500;
  baseCardWidth = 500;
  filters: {};

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
    this.filters = form;
    this.filteredGames = this.games
      .filter(game =>
        (!form.name || game.title.includes(form.name))
        && (!form.type || (!!game.genres.find(genre => genre.id === Number(form.type))))
        && (!form.editor || game.publisher.name.includes(form.editor))
      );
  }

  getGamesList(pageNum?: number) {
    this.gameApi.getAllGames(pageNum)
      .subscribe((data: Games[]) => {
        this.games = data;
        this.pagination = [
          this.gameApi.firstPage,
          this.gameApi.prevPage,
          this.gameApi.currentPage,
          this.gameApi.nextPage,
          this.gameApi.lastPage,
        ];
        this.currentPage = this.gameApi.currentPage;
        this.filtering(this.filters ? this.filters : {});
      });
  }

  deleteGame(gameId: number) {
    if (confirm('Are you sure you want to delete this game ?')) {
      this.gameApi.deleteGame(gameId)
        .subscribe(data => {
          this.getGamesList(this.currentPage['num']);
        });
    }
  }

  ngOnInit() {
    this.getGamesList();
  }

}
