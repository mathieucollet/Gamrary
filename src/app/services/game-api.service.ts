import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {Categories} from '../interfaces/categories';
import {Publishers} from '../interfaces/publishers';
import {Developers} from '../interfaces/developers';
import {Games} from '../interfaces/games';
import {delay, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameApiService {

  private apiUrl = 'http://localhost:3000/';
  public firstPage = {};
  public prevPage = {};
  public nextPage = {};
  public lastPage = {};
  public currentPage = {};

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.apiUrl + 'genres');
  }

  getAllPublishers(): Observable<Publishers[]> {
    return this.http.get<Publishers[]>(this.apiUrl + 'publishers');
  }

  getAllDevelopers(): Observable<Developers[]> {
    return this.http.get<Developers[]>(this.apiUrl + 'developers');
  }

  getRawGame(gameId: number): Observable<Games> {
    return this.http.get<Games>(this.apiUrl + 'games/' + gameId);
  }

  createGame(game: Games) {
    return this.http.post(this.apiUrl + 'games', game);
  }

  editGame(editGame: Games) {
    return this.http.patch(this.apiUrl + 'games/' + editGame.id, editGame);
  }

  getAllRawGames(pageNum?: number): Observable<HttpResponse<Games[]>> {
    if (pageNum) {
      return this.http.get<Games[]>(this.apiUrl + 'games?_limit=9&_page=' + pageNum, {observe: 'response'})
        .pipe(tap(res => {
          this.reset_pagination_links();
          if (res.headers.get('Link')) {
            this.retrieve_pagination_links(res.headers.get('Link'));
          }
          this.currentPage = {name: 'current', num: pageNum};
        }));
    }
    return this.http.get<Games[]>(this.apiUrl + 'games?_limit=9&_page=1', {observe: 'response'})
      .pipe(tap(res => {
        this.reset_pagination_links();
        if (res.headers.get('Link')) {
          this.retrieve_pagination_links(res.headers.get('Link'));
        }
        this.currentPage = {name: 'current', num: 1};
      }));
  }

  deleteGame(gameId: number) {
    return this.http.delete(this.apiUrl + 'games/' + gameId);
  }

  getGame(gameId: number) {
    return forkJoin([
      this.getRawGame(gameId),
      this.getAllCategories(),
      this.getAllPublishers(),
      this.getAllDevelopers()
    ])
      .pipe(
        delay(1000),
        map(([
               game,
               categories,
               publishers,
               developers
             ]) => this.convertGame(game, categories, publishers, developers)));
  }

  private convertGame(game: Games, categories: Categories[], publishers: Publishers[], developers: Developers[]) {
    game.genres = game.genres.map(genre => categories.find(category => category.id === Number(genre)));
    game.publisher = publishers.find(publisher => publisher.id === Number(game.publisher));
    game.developer = developers.find(developer => developer.id === Number(game.developer));
    return game;
  }

  getAllGames(pageNum?: number) {
    return forkJoin([
      this.getAllRawGames(pageNum),
      this.getAllCategories(),
      this.getAllPublishers(),
      this.getAllDevelopers()
    ])
      .pipe(
        delay(1000),
        map(([
               games,
               categories,
               publishers,
               developers
             ]) => this.convertGames(games.body, categories, publishers, developers)));
  }

  private convertGames(
    games: Games[],
    categories: Categories[],
    publishers: Publishers[],
    developers: Developers[]) {
    return games.map(game => ({
      ...game,
      genres: game.genres.map(genre => categories.find(category => category.id === Number(genre))),
      publisher: publishers.find(publisher => publisher.id === Number(game.publisher)),
      developer: developers.find(developer => developer.id === Number(game.developer)),
    }));
  }

  private parse_link_header(headerLink: string) {
    if (headerLink.length === 0) {
      return;
    }

    const parts = headerLink.split(',');
    const links = {};
    parts.forEach(p => {
      const section = p.split(';');
      const name = section[1].replace(/rel="(.*)"/, '$1').trim();
      const num = Number(section[0].replace(/(.*)page=(.[0-9]{0,9})&{0,1}(.*)/, '$2').trim());
      links[name] = {name, num};

    });
    return links;
  }

  private retrieve_pagination_links(headerLink: string) {
    const linkHeader = this.parse_link_header(headerLink);
    this.firstPage = linkHeader['first'];
    this.lastPage = linkHeader['last'];
    if (linkHeader['prev'] && linkHeader['prev'].num !== linkHeader['first'].num) {
      this.prevPage = linkHeader['prev'];
    }
    if (linkHeader['next'] && linkHeader['next'].num !== linkHeader['last'].num) {
      this.nextPage = linkHeader['next'];
    }
  }

  private reset_pagination_links() {
    this.firstPage = {};
    this.prevPage = {};
    this.nextPage = {};
    this.lastPage = {};
    this.currentPage = {};
  }
}

