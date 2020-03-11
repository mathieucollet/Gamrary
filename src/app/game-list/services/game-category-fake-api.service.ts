import {Injectable} from '@angular/core';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameCategoryFakeApiService {
  categories = [
    {
      id: 1,
      name: 'Shoot\'em up',
    },
    {
      id: 2,
      name: 'Run and gun',
    },
    {
      id: 3,
      name: 'Jeu de plateforme',
    },
    {
      id: 4,
      name: 'Multijoueur',
    },
    {
      id: 5,
      name: 'Solo',
    },
  ];

  constructor() {
  }

  getAll() {
    return of(this.categories);
  }
}
