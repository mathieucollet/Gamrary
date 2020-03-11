import {Injectable} from '@angular/core';
import {forkJoin, of} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {GameCategoryFakeApiService} from './game-category-fake-api.service';
import {GamePublisherFakeApiService} from './game-publisher-fake-api.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameFakeApiService {
  jeux = [
    {
      titre: 'BattleBlock Theater',
      genres: [2, 3, 4, 5],
      note: '9.8',
      cover: 'https://vistapointe.net/images/battleblock-theater-5.jpg',
      publisher: 1,
      description: 'Having shipwrecked on a mysterious island you find yourself both betrayed by your best friend\n' +
        '      Hatty and captured by the locals. All of this is happening while being forced into deadly performances. This\n' +
        '      however, is just the start of your problems.'
    },
    {
      titre: 'Cuphead',
      genres: [1, 3, 4, 5],
      note: '10',
      cover: 'https://www.pdvg.it/wp-content/uploads/2017/10/cuphead_1920x1080_titled_hero_art.jpg',
      publisher: 2,
      description:
        'Cuphead est un jeu vidéo indépendant mêlant « Shoot \'em up » et « run and gun ». Il est créé par des frères canadiens, ' +
        'Chad et Jared Moldenhauer, employés du Studio MDHR. Le jeu est inspiré par les œuvres de réalisateurs de dessins animés ' +
        'des années 1930 comme les studios de Max Fleischer.'
    },
    {
      titre: 'Mon petit poney',
      genres: [3, 5],
      note: '0.2',
      cover:
        'https://vignette.wikia.nocookie.net/mylittlepony/images/2/25/G%C3%A9n%C3%A9rique_%28Photo_Finish_fait_le_photo%29.png' +
        '/revision/latest?cb=20140130061148&path-prefix=fr',
      publisher: 3,
      description: 'In the game, the player is asked to help Twilight Sparkle rebuild her home of Ponyville after it fell into the ' +
        'shadow of the villainous Nightmare Moon. To do so, the player uses in-game currency and other collected treasures to build homes' +
        ' to bring more ponies to the town, and then create businesses for them to work at and generate money. '
    }
  ];


  constructor(
    private categoriesApi: GameCategoryFakeApiService,
    private publishersApi: GamePublisherFakeApiService,
    private http: HttpClient
  ) {
  }

  getAll() {
    let test;
    this.http.get('./games.json').subscribe(ah => test = ah);
    console.log(test);
    return forkJoin([of(this.jeux), this.categoriesApi.getAll(), this.publishersApi.getAll()]).pipe(
      delay(1000),
      map(([games, categories, publishers]) => this.convert(games, categories, publishers))
    );
  }

  private convert(games, categories, publishers): any[] {
    return games.map(game => ({
      ...game,
      genres: game.genres.map(genre => categories.find(category => category.id === genre)),
      publisher: publishers.find(publisher => publisher.id === game.publisher)
    }));
  }
}
