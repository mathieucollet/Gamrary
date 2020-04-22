import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {Categories} from '../../interfaces/categories';
import {Publishers} from '../../interfaces/publishers';
import {Developers} from '../../interfaces/developers';
import {Games} from '../../interfaces/games';
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

  getAllRawGames(url?: string): Observable<HttpResponse<Games[]>> {
    if (url) {
      return this.http.get<Games[]>(url, {observe: 'response'})
        .pipe(tap(res => {
          this.retrieve_pagination_links(res.headers.get('Link'));
          const currentPage = Number(url.replace(/(.*)page=(.*)/, '$2').trim());
          this.currentPage = {name: 'current', url: '#', num: currentPage};
        }));
    }
    return this.http.get<Games[]>(this.apiUrl + 'games?_limit=9&_page=1', {observe: 'response'})
      .pipe(tap(res => {
        this.retrieve_pagination_links(res.headers.get('Link'));
        this.currentPage = {name: 'current', url: '#', num: 1};
      }));
  }

  getAllGames(url?: string) {
    return forkJoin([
      this.getAllRawGames(url),
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
             ]) => this.convert(games.body, categories, publishers, developers)));
  }

  private convert(
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
      const url = section[0].replace(/<(.*)>/, '$1').trim();
      const name = section[1].replace(/rel="(.*)"/, '$1').trim();
      const num = Number(url.replace(/(.*)page=(.*)/, '$2').trim());
      links[name] = {name, url, num};

    });
    return links;
  }

  private retrieve_pagination_links(headerLink: string) {
    this.reset_pagination_links();
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

