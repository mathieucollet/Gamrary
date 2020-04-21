import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {Categories} from '../../interfaces/categories';
import {Publishers} from '../../interfaces/publishers';
import {Developers} from '../../interfaces/developers';
import {Games} from '../../interfaces/games';
import {delay, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameApiService {

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>('http://localhost:3000/genres');
  }

  getAllGames() {
    return forkJoin([
      this.http.get<Games[]>('http://localhost:3000/games'),
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
             ]) => this.convert(games, categories, publishers, developers)));
  }

  getAllPublishers(): Observable<Publishers[]> {
    return this.http.get<Publishers[]>('http://localhost:3000/publishers');
  }

  getAllDevelopers(): Observable<Developers[]> {
    return this.http.get<Developers[]>('http://localhost:3000/developers');
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
}
